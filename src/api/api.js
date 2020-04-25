import * as axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://quiz-spring-boot-app.herokuapp.com/'
});

export const questionsAPI = {
    getQuestions() {
        return axiosInstance
            .get(
                'questions')
                .then(response => response.data);
    }
}
