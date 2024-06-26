const schema = {
    name: "featuredAnimePlaylist",
    title: "Featured Anime",
    type: "document",
    fields: [
      {
        name: "title",
        title: "Title",
        type: "string",
        validation: (Rule: any) => Rule.required(),
      },
      {
        name: "posts",
        title: "Posts",
        type: "array",
        of: [
          {
            type: "reference",
            to: [{ type: "post" }],
          },
        ],
      },
    ],
  };
  
  export default schema;
  