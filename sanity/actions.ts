import { groq } from "next-sanity";
import { readClient } from "./lib/client";
import { buildQuery } from "./utils";

interface GetResourcesParams {
  query: string;
  category: string;
  page: string;
}

interface SlugProps {
  slug: string;
}

export const getPostPlaylist = async () => {
  try {
    const resources = await readClient.fetch(
      groq`*[_type == "postPlaylist"] | order(_id desc) {
        _id,
        title,
        posts[0...10]->{
          title,
          _id,
          "image": mainImage.asset->url,
          category,
          name,
          description,
          "slug": slug.current
        }
      }`
    );

    return resources;
  } catch (error) {
    console.log(error);
  }
};

export const getPosts = async (params: GetResourcesParams) => {
  const { query, category, page } = params;

  try {
    const resources = await readClient.fetch(
      groq`${buildQuery({
        type: "post",
        query,
        category,
        page: parseInt(page),
      })}{
        title,
        name,
        _id,
        "image": mainImage.asset->url,
        slug,
        category,
        "slug": slug.current
      }`
    );
    return resources;
  } catch (error) {
    console.log(error);
  }
};

export const getFeaturedAnime = async () => {
  try {
    const resources = await readClient.fetch(
      groq`*[_type == "featuredAnimePlaylist"] | order(_id desc) {
        _id,
        title,
        posts[0...6]->{
          title,
          _id,
          "image": mainImage.asset->url,
          category,
          name,
          description,
          "slug": slug.current
        }
      }`
    );

    return resources;
  } catch (error) {
    console.log(error);
  }
};

export const getPost = async ({ slug }: SlugProps) => {
  try {
    const resources = await readClient.fetch(
      groq`*[_type == "post" && slug.current == "${slug}"][0] {
        _id,
        description,
        name,
        "slug": slug.current,
        title,
        mainImage,
        body,
        author->{
          name
        },
        category,
        publishedAt,
        credit
        
    }`
    );

    return resources;
  } catch (error) {
    console.log(error);
  }
};
