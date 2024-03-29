$(document).ready(function () {
    const environment = config.env;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const videoId = urlParams.get("videoId");
    const token = urlParams.get("token");
    let courseId = "";

    $.ajax({
        url: `${environment}/videos/${videoId}`,
        type: "GET",
        headers: authHeader,
        dataType: "json",
        success: function (data) {
            console.log(data);
            document.title += " | " + data.title;
            $("#videopage_title").text(data.title);
            $("#videopage_views").text(data.views);
            $("#videopage_timelength").text(
                data.timeLength > 0 ? data.timeLength : "NOT DEFINED"
            );
            $("#videopage_difficulty").text(difficulty[data.difficulty].title);
            $("#videopage_status").text(status[data.status].title);
            $("#videopage_status").addClass(status[data.status].class);
            $("#videopage_desc").text(data.description);
            $("#videopage_editlink").attr(
                "href",
                "custom/video/edit-video.html?videoId=" + data._id
            );
            courseId = data.courseId;

            var video = document.getElementById("videopage_video");
            var source = document.createElement("source");

            source.src = data.videoURI;
            source.type = "video/mp4";

            video.prepend(source);
            getVideoLength(data.timeLength);

            initTokenSecurity();
        }, //success
        error: function () {
            console.log("error: cannot call api");
        }, //error
    }); //ajax

    const getVideoLength = (timeLength) => {
        var video = document.getElementById("videopage_video");
        if (timeLength <= 0) {
            video.ondurationchange = (e) => {
                const time = video.duration;
                $.ajax({
                    url: `${environment}/videos/timelength?videoId=${videoId}&timeLength=${time}`,
                    headers: authHeader,
                    type: "PATCH",
                    dataType: "json",
                    success: function (data) {
                        $("#videopage_timelength").text(video.duration);
                    }, //success
                    error: function (xhr, status, error) {
                        console.log("error: cannot call api");
                    }, //error
                }); //ajax
            };
        }
    };

    $("#videopage_deletevideo").click(function () {
        Swal.fire({
            title: "Are you sure you want to delete this video?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    url: `${environment}/videos/remove/${videoId}`,
                    headers: authHeader,
                    type: "PATCH",
                    dataType: "json",
                    success: function (data) {
                        Swal.fire({
                            title: "Video removed successfully",
                            text: "You will be able to relist it later",
                            icon: "success",
                            confirmButtonColor: "#3085d6",
                            confirmButtonText: "Okay",
                            timer: 2500,
                        }).then(() =>
                            window.location.replace(
                                `custom/course/overview.html?courseId=${courseId}&token=` +
                                    token
                            )
                        );
                    }, //success
                    error: function (xhr, status, error) {
                        console.log("error: cannot call api");
                    }, //error
                }); //ajax
            }
        });
    });

    $(".close-message-image").click(function () {
        $(".message-image-modal-outer").fadeOut();
    });
});
