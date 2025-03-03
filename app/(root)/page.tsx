import SearchForm from "../../components/SearchForm";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { auth } from "@/auth"

export default async function Home({ searchParams }: { searchParams: Promise<{ query: string }> }) {

  const query = (await searchParams).query;
  const params = { search: query || null }
  // const posts = await client.fetch(START_UP_QUERY);
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params: params });
  const session = await auth();
  
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Home Page</h1>
        <p className="sub-heading">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum vero amet nobis a dolorem.
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {
            query ? `Search results for "${query}"` : "All records"
          }
        </p>
        <ul className="mt-7 card_grid">
          {
            (posts?.length > 0)
              ? (posts.map((post: StartupCardType, index: number) => <StartupCard key={post._id} post={post} />))
              : (<p className="no-results">No Result Found</p>)
          }
        </ul>
        <SanityLive />
      </section>
    </>
  );
}
