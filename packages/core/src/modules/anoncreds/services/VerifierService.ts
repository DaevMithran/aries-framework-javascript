import type * as Indy from 'indy-sdk'

export interface VerifierService {

  verifyProof({
    proofRequest,
    proof,
    schemas,
    credentialDefinitions,
  }: VerifyProofOptions): Promise<boolean> 
  
  private getRevocationRegistries(proof: Indy.IndyProof) : Promise<{
    revocationRegistryDefinitions: Indy.RevocRegDefs;
    revocationRegistryStates: Indy.RevStates;
    }>
}

export interface VerifyProofOptions {
  proofRequest: Indy.IndyProofRequest
  proof: Indy.IndyProof
  schemas: Indy.Schemas
  credentialDefinitions: Indy.CredentialDefs
}