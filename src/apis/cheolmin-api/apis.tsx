import axios from 'axios';
import {
  IAddComment,
  IAddPost,
  IDeleteComment,
  IEditComment,
  IGetPosts,
  IUpdatePost,
} from './apis.types';
import axiosInstance from '../loginapi';
// axios
const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');

// export const addPost = async (target: IAddPost) => {
//   try {
//     const formData = new FormData();
//     formData.append('image', target.image);
//     formData.append('content', target.content);
//     // formData.append('EmotionStatus', target.EmotionStatus);
//     const response = await axios.post(
//       `${process.env.REACT_APP_SERVER_URL}/diary/posting`,
//       formData,
//       {
//         withCredentials: true,
//         headers: {
//           Refreshtoken: `${refreshToken}`,
//           Authorization: `${accessToken}`,
//         },
//       }
//     );
//     console.log(response);
//     return response.data;
//   } catch (error) {
//     console.log('다시 시도하세요');
//   }
// };

export const deletePost = async (id: any) => {
  try {
    const response = await axiosInstance.delete(
      `/diary/delete/${id}`,
      {
        headers: {
          Refreshtoken: `${refreshToken}`,
          Authorization: `${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log('다시 시도하세요');
  }
};

export const getPosts = async (target: IGetPosts) => {
  try {
    console.log(accessToken);
    console.log(refreshToken);
    const response = await axiosInstance.get(
      `/diary/calendar/${target.currentYear}/${target.currentMonth}`,
      {
        headers: {
          Refreshtoken: `${refreshToken}`,
          Authorization: `${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log('다시 시도하세요');
  }
};

export const getOnePostInfo = async (diaryId: string | undefined) => {
  try {
    const response = await axiosInstance.get(
      `/diary/detail/${diaryId}`,
      {
        headers: {
          Refreshtoken: `${refreshToken}`,
          Authorization: `${accessToken}`,
        },
      }
    );
    console.log('게시글 상세조회에 성공하셨습니다.');

    return response.data;
  } catch (error) {
    console.log('테스트');
  }
};

export const getComments = async (diaryId: string | undefined | number) => {
  try {
    const response = await axiosInstance.get(
      `/diary/detail/comment/${diaryId}`,
      {
        headers: {
          Refreshtoken: `${refreshToken}`,
          Authorization: `${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log('테스트');
  }
};

export const addComment = async (target: IAddComment) => {
  try {
    const response = await axiosInstance.post(
      `/diary/detail/comment/${target.diaryId}`,
      {
        content: target.content,
      },
      {
        headers: {
          Refreshtoken: `${refreshToken}`,
          Authorization: `${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log('테스트');
  }
};

export const editComment = async (target: IEditComment) => {
  try {
    const response = await axiosInstance.patch(
      `/diary/detail/comment/${target.commentId}`,
      {
        content: target.message,
      },
      {
        headers: {
          Refreshtoken: `${refreshToken}`,
          Authorization: `${accessToken}`,
        },
      }
    );
    alert('성공적으로 수정됐습니다');
    return response.data;
  } catch (error) {
    console.log('잘못된 접근입니다.');
  }
};

export const deleteComment = async (commentId: IDeleteComment) => {
  try {
    const response = await axiosInstance.delete(
      `/diary/detail/comment/${commentId}`,
      {
        headers: {
          Refreshtoken: `${refreshToken}`,
          Authorization: `${accessToken}`,
        },
      }
    );
  } catch (error) {
    console.log('이상한 접근입니다.');
  }
};

export const getMyInfo = async () => {
  try {
    const response = await axiosInstance.get(`/myInfo`, {
      headers: {
        Authorization: `${accessToken}`,
        Refreshtoken: `${refreshToken}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log('error');
  }
};

// export const addPost = async (target: IAddPost) => {
//   try {
//     const formData = new FormData();
//     formData.append('image', target.image);
//     formData.append('content', target.content);
//     // formData.append('EmotionStatus', target.EmotionStatus);
//     const response = await axios.post(
//       `${process.env.REACT_APP_SERVER_URL}/diary/posting`,
//       formData,
//       {
//         withCredentials: true,
//         headers: {
//           Refreshtoken: `${refreshToken}`,
//           Authorization: `${accessToken}`,
//         },
//       }
//     );
//     console.log(response);
//     return response.data;
//   } catch (error) {
//     console.log('다시 시도하세요');
//   }
// };

export const editMyInfo = async (target: any) => {
  try {
    const formData = new FormData();
    formData.append('username', target?.myPost.username);
    formData.append('image', target?.newProfile.imgFile);
    const response = await axiosInstance.patch(
      `/myInfo/editmyInfo`,
      formData,
      {
        headers: {
          Refreshtoken: `${refreshToken}`,
          Authorization: `${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    console.log('formData', formData);
    return response.data;
  } catch (error) {
    console.log('error');
  }
};

export const editPassword = async (target: any) => {
  try {
    const response = await axiosInstance.patch(
      `/myInfo/edit-pw`,
      {
        password: target.password,
        newPassword: target.newPassword,
      },
      {
        headers: {
          Refreshtoken: `${refreshToken}`,
          Authorization: `${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    // alert('현재 비밀번호가 일치하지 않습니다.');
    console.log('에러');
  }
};

export const getPrevMonthPosts = async () => {
  try {
    const response = await axiosInstance.get(
      `/diary/calendar/previousMonth`,
      {
        headers: {
          Refreshtoken: `${refreshToken}`,
          Authorization: `${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log('error');
  }
};

export const getNextMonthPosts = async () => {
  try {
    const response = await axiosInstance.get(
      `/diary/calendar/nextMonth`,
      {
        headers: {
          Refreshtoken: `${refreshToken}`,
          Authorization: `${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log('error');
  }
};

export const updatePost = async (target: IUpdatePost) => {
  try {
    const response = await axiosInstance.patch(
      `/diary/edit/${target.diaryId}`,
      {
        content: target.myPost?.contents,
        isPublic: target.myPost.isPublic,
      },
      {
        headers: {
          Refreshtoken: `${refreshToken}`,
          Authorization: `${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log('error');
  }
};

export const getHearts = async (diaryId: any) => {
  const data = null;
  try {
    const response = await axiosInstance.post(
      `/feeds/${diaryId}/like`,
      data,
      {
        headers: {
          Refreshtoken: `${refreshToken}`,
          Authorization: `${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log('에러');
  }
};
