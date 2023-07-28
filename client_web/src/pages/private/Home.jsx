import React from "react";
import CourseList from "../../components/CourseList";

function Home() {
    return (
        <div className="mb-5">
            <div className="hero background-image-dj px-4 mb-4 text-center">
                <h1 className="display-3 text-white">
                    Become the DJ your friends
                    <br /> want to see live
                </h1>
            </div>
            <CourseList />
        </div>
    );
}

export default Home;
