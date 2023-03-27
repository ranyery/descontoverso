export interface IOfferInfoResponse {
  data: Data;
}

interface Data {
  public: Public;
}

interface Public {
  offer: IOffer;
  __typename: string;
}

export interface IOffer {
  id: string;
  body: any;
  noIndex: boolean;
  commentCount: number;
  couponCode: any;
  discountFixed: any;
  discountPercentage: any;
  freeShipping: any;
  image: Image;
  isLocal: any;
  isFirstOffer: boolean;
  isPicked: any;
  isTracked: boolean;
  expireLock: any;
  lockedComments: boolean;
  kind: string;
  price: number;
  status: string;
  temperature: number;
  title: string;
  sourceUrl: string;
  tip: Tip;
  deletionReasons: DeletionReason[];
  timestamps: Timestamps;
  category: Category;
  user: User;
  store: Store;
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

interface Tip {
  title: string;
  description: string;
  smallIconUrl: string;
  __typename: string;
}

interface DeletionReason {
  id: string;
  title: string;
  link: string;
  bannerTitle: string;
  description: string;
  __typename: string;
}

interface Timestamps {
  firstApprovedAt: string;
  approvedAt: string;
  createdAt: string;
  pickedAt: any;
  lastCommentedAt: any;
  publishAt: any;
  __typename: string;
}

interface Category {
  id: string;
  slug: string;
  title: string;
  __typename: string;
}

interface User {
  id: string;
  image: Image2;
  nickname: string;
  __typename: string;
}

interface Image2 {
  id: string;
  url: string;
  __typename: string;
}

interface Store {
  id: string;
  name: string;
  slug: string;
  url: string;
  image: Image3;
  __typename: string;
}

interface Image3 {
  id: string;
  small: string;
  medium: string;
  large: string;
  extraLarge: string;
  original: string;
  __typename: string;
}
