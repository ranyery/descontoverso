export interface IOfferResponse {
  data?: Data;
  errors?: Error[];
}

interface Data {
  public: Public;
}

interface Public {
  storePromotions: StorePromotions;
  __typename: string;
}

interface StorePromotions {
  edges: IOffer[];
  pageInfo: IPageInfo;
  __typename: string;
}

export interface IOffer {
  id: string;
  discountFixed?: any;
  discountPercentage?: any;
  freeShipping?: boolean;
  image: Image;
  price: number;
  status: string;
  temperature: number;
  title: string;
  isTracked: boolean;
  kind: string;
  commentCount: number;
  store: Store;
  timestamps: Timestamps;
  __typename: string;
}

interface Image {
  id: string;
  small: string;
  medium: string;
  large: string;
  extraLarge: string;
  original: string;
  __typename: string;
}

interface Store {
  url: string;
  slug: string;
  name: string;
  image: Image2;
  __typename: string;
}

interface Image2 {
  id: string;
  small: string;
  medium: string;
  large: string;
  extraLarge: string;
  original: string;
  __typename: string;
}

interface Timestamps {
  firstApprovedAt: string;
  approvedAt: string;
  createdAt: string;
  pickedAt?: string;
  lastCommentedAt?: string;
  publishAt?: any;
  __typename: string;
}

export interface IPageInfo {
  startCursor: string;
  endCursor: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  __typename: string;
}

export interface Error {
  message: string;
  extensions: Extensions;
}

export interface Extensions {
  code: string;
}
