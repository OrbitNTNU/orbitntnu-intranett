import { BlogPostInterface } from "@/interfaces/BlogPostInterface";

const mockBlogPosts: BlogPostInterface[] = [
  {
    announcementId: 1,
    postTime: new Date("2023-10-25T09:30:00"),
    memberID: 101,
    announcement:
      "This is the first blog post. It contains a longer announcement text to test the preview feature, which should not truncate.",
    title: "First Blog Post",
  },
  {
    announcementId: 2,
    postTime: new Date("2023-10-24T15:45:00"),
    memberID: 102,
    announcement:
      "Here's the second blog post for testing purposes. This one has an even longer announcement text to ensure that the preview function works as expected and truncates long content.",
    title: "Second Blog Post",
  },
  {
    announcementId: 3,
    postTime: new Date("2023-10-23T11:15:00"),
    memberID: 103,
    announcement:
      "A third blog post to complete the mock data. This is a lengthy announcement to verify that the preview feature properly handles long text and provides a concise preview.",
    title: "Third Blog Post",
  },
];

export default mockBlogPosts;
