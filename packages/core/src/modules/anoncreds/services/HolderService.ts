import type * as Indy from 'indy-sdk'
import { RequestedCredentials } from '../../proofs'

export interface HolderService {

  /**
   * Creates an Indy Proof in response to a proof request. Will create revocation state if the proof request requests proof of non-revocation
   *
   * @param proofRequest a Indy proof request
   * @param requestedCredentials the requested credentials to use for the proof creation
   * @param schemas schemas to use in proof creation
   * @param credentialDefinitions credential definitions to use in proof creation
   * @throws {Error} if there is an error during proof generation or revocation state generation
   * @returns a promise of Indy Proof
   *
   * @todo support attribute non_revoked fields
   */
  createProof({
    proofRequest,
    requestedCredentials,
    schemas,
    credentialDefinitions,
  }: CreateProofOptions): Promise<Indy.IndyProof>

  /**
   * Store a credential in the wallet.
   *
   * @returns The credential id
   */
  storeCredential({
    credentialRequestMetadata,
    credential,
    credentialDefinition,
    credentialId,
    revocationRegistryDefinition,
  }: StoreCredentialOptions): Promise<Indy.CredentialId> 

  /**
   * Get a credential stored in the wallet by id.
   *
   * @param credentialId the id (referent) of the credential
   * @throws {Error} if the credential is not found
   * @returns the credential
   *
   * @todo handle record not found
   */
  getCredential(credentialId: Indy.CredentialId): Promise<Indy.IndyCredentialInfo>

  /**
   * Create a credential request for the given credential offer.
   *
   * @returns The credential request and the credential request metadata
   */
  createCredentialRequest({
    holderDid,
    credentialOffer,
    credentialDefinition,
  }: CreateCredentialRequestOptions): Promise<[Indy.CredReq, Indy.CredReqMetadata]>

  /**
   * Retrieve the credentials that are available for an attribute referent in the proof request.
   *
   * @param proofRequest The proof request to retrieve the credentials for
   * @param attributeReferent An attribute referent from the proof request to retrieve the credentials for
   * @param start Starting index
   * @param limit Maximum number of records to return
   *
   * @returns List of credentials that are available for building a proof for the given proof request
   *
   */
  getCredentialsForProofRequest({
    proofRequest,
    attributeReferent,
    start = 0,
    limit = 256,
    extraQuery,
  }: GetCredentialForProofRequestOptions): Promise<Indy.IndyCredential[]> 

  /**
   * Delete a credential stored in the wallet by id.
   *
   * @param credentialId the id (referent) of the credential
   *
   */
  deleteCredential(credentialId: Indy.CredentialId): Promise<void>

}

export interface GetCredentialForProofRequestOptions {
  proofRequest: Indy.IndyProofRequest
  attributeReferent: string
  start?: number
  limit?: number
  extraQuery?: Indy.ReferentWalletQuery
}

export interface CreateCredentialRequestOptions {
  holderDid: string
  credentialOffer: Indy.CredOffer
  credentialDefinition: Indy.CredDef
}

export interface StoreCredentialOptions {
  credentialRequestMetadata: Indy.CredReqMetadata
  credential: Indy.Cred
  credentialDefinition: Indy.CredDef
  credentialId?: Indy.CredentialId
  revocationRegistryDefinition?: Indy.RevocRegDef
}

export interface CreateProofOptions {
  proofRequest: Indy.IndyProofRequest
  requestedCredentials: RequestedCredentials
  schemas: Indy.Schemas
  credentialDefinitions: Indy.CredentialDefs
}
