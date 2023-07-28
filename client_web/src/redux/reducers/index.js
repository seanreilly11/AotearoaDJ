import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { courses } from './course.reducer';
import { videos } from './video.reducer';
import { users } from './user.reducer';

export default combineReducers({
	courses,
	videos,
	authentication,
	users,
});
