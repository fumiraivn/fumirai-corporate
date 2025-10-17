export enum ELanguage {
  EN = 'en',
  JA = 'ja',
  VI = 'vi',
}

export enum EHomeSection {
  ABOUT_US = 'about-us',
  OUR_SERVICES = 'our-services',
  OUR_COMPANY = 'our-company',
}

export enum EBlockId {
  BANNER = 'banner',
  ABOUT_US = 'about-us',
  OUR_SERVICES = 'our-services',
  OUR_COMPANY = 'our-company',
  JOB_1 = 'job-1',
}

export enum ETextFields {
  VIETNAMESE_TEXT = 'vietnamese_text',
  ENGLISH_TEXT = 'english_text',
  JAPANESE_TEXT = 'japanese_text',
}

export enum ECompanySpecialLabel {
  MAP_URL = 'map_url',
  EMBED_ADDRESS = 'embed_address',
}

// Shared content field identifiers (avoid hardcoded strings in hooks/components)
export enum EFieldId {
  GROUP = 'group',
  GROUP_ITEM = 'group_item',
  TEXT = 'text',
  TEXTAREA = 'textarea',
  HTML_RAW = 'html_raw',
  IMAGE_CUSTOM = 'image_custom',
  MAP = 'map',
}

// Shared text type flags used within TEXT fields
export enum ETextType {
  MAIN = 'main',
  SUB = 'sub',
}

// Keys for top-level API response structures
export enum EContentKey {
  CONTENT = 'content',
}

// Keys inside content items
export enum EContentFieldKey {
  IMAGE = 'image',
  TEXT_TYPE = 'text_type',
}
