import { useQuery } from "react-query";
import axios from "axios";

const fetchUser = (email) => {
  return axios.get(`http://localhost:4000/users/${email}`);
};

const fetchCourses = (channelId) => {
  return axios.get(`http://localhost:4000/courses/${channelId}`);
};

export const DependentQueriesPage = ({ email }) => {
  const { data: user } = useQuery({
    queryKey: ["users", email],
    queryFn: () => fetchUser(email),
  });
  const channelId = user?.data.channelId;

  const { data: courses } = useQuery({
    queryKey: ["courses", channelId],
    queryFn: () => fetchCourses(channelId),
    enabled: !!channelId,
  });
  console.log(courses?.data);
  return (
    <div>
      DependentQueriesPage
      {courses?.data.list.map((course) => (
        <p key={course}>{course}</p>
      ))}
    </div>
  );
};
