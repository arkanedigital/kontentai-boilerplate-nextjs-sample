// Kontent.ai Delivery API


import { createDeliveryClient, camelCasePropertyNameResolver, ITaxonomyTerms } from '@kontent-ai/delivery-sdk'
import { AboutUs, Article, Brewer, Cafe, Coffee, HeroUnit, Home, contentTypes } from '../models';

const sourceTrackingHeaderName = 'X-KC-SOURCE'

const client = createDeliveryClient({
  projectId: process.env.KONTENT_PROJECT_ID || "975bf280-fd91-488c-994c-2f04416e5ee3",
  globalHeaders: (_queryConfig) => [
    {
      header: sourceTrackingHeaderName,
      value: `${process.env.APP_NAME || "n/a"};${process.env.APP_VERSION || "n/a"}`,
    },
  ],
  propertyNameResolver: camelCasePropertyNameResolver
});

export async function getHome(): Promise<Home> {
  const response = await client
    .item<Home>('home')
    .toPromise()

  return response.data.item;
}

export async function getAboutUs(): Promise<AboutUs> {
  const response = await client
    .item<AboutUs>('about_us')
    .toPromise()

  return response.data.item;
}

export async function getArticles(): Promise<Article[]> {
  const response = await client
    .items<Article>()
    .type(contentTypes.article.codename)
    .orderByDescending('elements.post_date')
    .limitParameter(10)
    .toPromise();
  
  // @TODO: understand why this linked item's related articles has a circular reference and can't be serialized
  (response.data.items[3].elements.relatedArticles.linkedItems as any)[0].elements.relatedArticles = [];

  return response.data.items;
}

export async function getArticle(articleId: string): Promise<Article> {
  const response = await client
    .item<Article>(articleId)
    .toPromise()

  return response.data.item;
}

export async function getBrewers(): Promise<Brewer[]> {
  const response = await client
    .items<Brewer>()
    .type(contentTypes.brewer.codename)
    .orderByAscending('elements.product_name')
    .toPromise();

  return response.data.items;
}

export async function getBrewer(brewerId: string): Promise<Brewer> {
  const response = await client
    .item<Brewer>(brewerId)
    .toPromise()

  return response.data.item;
  // console.log(`/en-us/brewers/${brewerId}`);

  // const response = await client
  //   .items<Brewer>()
  //   .type(contentTypes.brewer.codename)
  //   .equalsFilter('elements.url_pattern', `/en-us/brewers/${brewerId}`)
  //   .toPromise();

  // console.log(response.data.items)
  // return response.data.items[0];
}

export async function getCafes(): Promise<Cafe[]> {
  const response = await client
    .items<Cafe>()
    .type(contentTypes.cafe.codename)
    .orderByDescending('system.name')
    .toPromise();

  return response.data.items;
}

export async function getCafe(cafeId: string): Promise<Cafe> {
  const response = await client
    .item<Cafe>(cafeId)
    .toPromise()

  return response.data.item;
}

// export async function getCoffee(): Promise<Coffee[]> {
//   const response = await client
//     .items<Coffee>()
//     .type(contentTypes.coffee.codename)
//     .equalsFilter('elements.url_pattern', coffeeSlug!!);

// }

export async function getHeroUnit() : Promise<HeroUnit> {
  const response = await client
    .item<HeroUnit>('home_page_hero_unit')
    .toPromise()

  return response.data.item;
}

export async function getTaxonomy(taxonomy: string): Promise<ITaxonomyTerms[]> {
  const response = await client
    .taxonomy(taxonomy)
    .toPromise();

  return response.data.taxonomy.terms;
}