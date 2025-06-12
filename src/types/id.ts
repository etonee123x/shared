export type Id = (string | number) & { readonly Id: unique symbol };

export interface WithId {
  id: Id;
}
