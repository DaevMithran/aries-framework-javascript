import type {
  default as Indy,
  CredDef,
  Schema,
  Cred,
  CredDefId,
  CredOffer,
  CredReq,
  CredRevocId,
  CredValues,
} from 'indy-sdk'


export interface IssuerService {

  /**
   * Create a new credential schema.
   *
   * @returns the schema.
   */
   createSchema({ originDid, name, version, attributes }: CreateSchemaOptions): Promise<Schema>

  /**
   * Create a new credential definition and store it in the wallet.
   *
   * @returns the credential definition.
   */
  createCredentialDefinition({
    issuerDid,
    schema,
    tag = 'default',
    signatureType = 'CL',
    supportRevocation = false,
  }: CreateCredentialDefinitionOptions): Promise<CredDef>

  /**
   * Create a credential offer for the given credential definition id.
   *
   * @param credentialDefinitionId The credential definition to create an offer for
   * @returns The created credential offer
   */
  createCredentialOffer(credentialDefinitionId: CredDefId): Promise<Indy.CredOffer> 

  /**
   * Create a credential.
   *
   * @returns Credential and revocation id
   */
  createCredential({
    credentialOffer,
    credentialRequest,
    credentialValues,
    revocationRegistryId,
    tailsFilePath,
  }: CreateCredentialOptions): Promise<[Cred, CredRevocId]> 
}

export interface CreateCredentialDefinitionOptions {
  issuerDid: string
  schema: Schema
  tag?: string
  signatureType?: 'CL'
  supportRevocation?: boolean
}

export interface CreateCredentialOptions {
  credentialOffer: CredOffer
  credentialRequest: CredReq
  credentialValues: CredValues
  revocationRegistryId?: string
  tailsFilePath?: string
}

export interface CreateSchemaOptions {
  originDid: string
  name: string
  version: string
  attributes: string[]
}
