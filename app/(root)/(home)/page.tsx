import AnimeCard from "@/components/AnimeCard";
import Filters from "@/components/Filters";
import Header from "@/components/Header";
import PlaylistCard from "@/components/PlaylistCard";
import PostCard from "@/components/PostCard";
import { getAnimeReviews, getPostPlaylist, getPosts } from "@/sanity/actions";
import React from "react";

export const revalidate = 60;

interface Props {
  searchParams: { [key: string]: string | undefined };
}

const Home = async ({ searchParams }: Props) => {
  const posts = await getPosts({
    query: searchParams?.query || "",
    category: searchParams?.category || "",
    page: "1",
  });

  const postsPlaylist = await getPostPlaylist();

  const animeRecomandation = await getAnimeReviews();

  return (
    <div className="max-w-screen-2xl">
      <div className="min-[1055px]:flex justify-center gap-3 min-[1300px]:gap-7">
        <main>
          <section>
            <Filters />
          </section>
          <div>
            {(searchParams?.query || searchParams?.category) && (
              <section>
                <div>
                  <Header
                    query={searchParams?.query || ""}
                    category={searchParams?.category || ""}
                  />
                  <div className="flex w-full flex-wrap  gap-2 justify-center sm:justify-start pl-1 mt-2">
                    {posts?.length > 0 ? (
                      posts.map((post: any) => (
                        <PostCard
                          key={post._id}
                          title={post.title}
                          id={post._id}
                          image={post.image}
                          name={post.name}
                          slug={post.slug}
                        />
                      ))
                    ) : (
                      <p className="font-black uppercase">No resources found</p>
                    )}
                  </div>
                </div>
              </section>
            )}
            {postsPlaylist.map((item: any) => (
              <section
                key={item._id}
                className="mt-2 w-full pl-7 min-[516px]:pl-1"
              >
                <h1 className="uppercase font-black text-2xl tracking-tighter navbar w-fit">
                  {item.title}
                </h1>
                <div className="mt-2 flex w-full flex-wrap flex-start sm:flex-col gap-3">
                  {item.posts.map((posts: any) => (
                    <div key={posts._id}>
                      <PlaylistCard
                        title={posts.title}
                        id={posts._id}
                        image={posts.image}
                        name={posts.name}
                        description={posts.description}
                        slug={posts.slug}
                      />
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </main>
        <div className="ideea-bg w-full mt-3 text-white px-4 py-10 lg:w-fit lg:h-fit lg:ml-1">
          <div>
            <h1 className="uppercase tracking-widest font-black text-3xl">
              Ideas
            </h1>
            <h2 className="uppercase tracking-tighter font-bold text-xs max-w-md lg:max-w-sm">
              If you have any ideas for blog posts, I would love to hear from
              you! Feel free to reach out to me here with your suggestions. Rest
              assured, you will be given full credit for your contribution to
              the blog. Looking forward to hearing your creative ideas!
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
