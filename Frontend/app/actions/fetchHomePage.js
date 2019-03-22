import Actions from '../store/actions';

const homepageSuccess = payload => ({
  type: Actions.homepageSuccess,
  payload,
});

const homepageFail = () => ({
  type: Actions.homepageFail,
});

const homepageInProgress = () => ({
  type: Actions.homepageInProgress,
});

const loginFail = payload => ({
  type: Actions.loginFail,
  payload,
});

export const fetchHomePage = () => async dispatch => {
  try {
    await dispatch(homepageInProgress());
    const res = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
    });
    if (!res.loginPage) {
      dispatch(
        homepageSuccess({
          users: res.users,
          tweets: res.tweets,
          following: res.tweets,
        }),
      );
    } else {
      dispatch(loginFail('Session timed out'));
    }
  } catch (err) {
    dispatch(homepageFail());
  }
};