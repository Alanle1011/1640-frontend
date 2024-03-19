import axios from "axios";

//moi lan chay BE thi thay URL
const BACKEND_URL =process.env.BACKEND_URL

const getContribution=axios.get(BACKEND_URL+'/contribution?populate=*');
// const createContributionAPIById=(id)=>axios.get(BACKEND_URL+'/contribution/'+id+'?populate=*');
const createContributionAPI= (uploadedUserId, studentId, studentName, title, content, submissionPeriodId) => {
    axios.post(
        BACKEND_URL+'/contribution',
        [
            {
                "uploadedUserId": uploadedUserId,
                "studentId": studentId,
                "studentName": studentName,
                "title": title,
                "content": content,
                "submissionPeriodId": submissionPeriodId
            },
        ],
        {
            params: { 'api-version': '3.0' },
            headers: {
                'content-type': 'application/json',
            },
        }
    )
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.error(error);
    });
}

export default{
    createContributionAPI,
    createContributionAPIById
}