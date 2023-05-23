import Image from 'next/image';

import { allPosts } from '@/.contentlayer/generated';
import CoverWrapper from '@/components/cover-wrapper';
import PostCard from '@/components/ui/PostCard';
import { siteConfig } from '@/config/site';
import Me from '@/public/images/hero.png';

interface IndexPageProps {
  children: React.ReactNode;
}

export default async function IndexPage({ children }: IndexPageProps) {
  console.log(allPosts);

  return (
    <>
      <CoverWrapper src={Me} />
      <main className="page relative mx-auto max-w-4xl overflow-hidden md:px-[2vw] ">
        <div className="absolute -top-16 left-[50%] -ml-16 h-32 w-32 items-center rounded-full shadow-lg">
          <Image
            className="h-full w-full rounded-full object-cover"
            src={Me}
            placeholder="blur"
            alt="page icon image"
          />
        </div>
        <h1 className="w-full text-center text-[2.5rem] font-bold  leading-tight">
          {`${siteConfig.name}.com`}
        </h1>
        <div className="page-content-has-aside flex w-full flex-col ">
          <article className="page-article">
            <div className="block min-w-full self-center">
              <div className="flex h-10 p-2">
                <h1 className="mr-2 inline-flex items-center break-words text-xl font-semibold">
                  Posts
                </h1>
              </div>
              <div className="self-center">
                <div className="transition duration-200 ease-out"></div>
                <div className="grid-cols-auto-fill  grid-rows-auto md:gap-6vmin border-fg-color-1 relative grid gap-4 border-t border-primaryFg pb-1 pt-4">
                  {children}
                  {allPosts.map((post) => (
                    <PostCard
                      key={post.title}
                      post={post}
                      // coverImages={coverImage}
                    />
                  ))}
                </div>
              </div>
            </div>
          </article>
          <aside className="aside hidden">
            <h1>yellow </h1>
          </aside>
        </div>
      </main>
    </>
  );
}
