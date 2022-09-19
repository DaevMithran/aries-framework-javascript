import type { IndyRevocationInterval } from '../../credentials'
import type { RequestedCredentials } from '../../proofs'
import type { default as Indy } from 'indy-sdk'

export interface RevocationService {

  createRevocationState(
    proofRequest: Indy.IndyProofRequest,
    requestedCredentials: RequestedCredentials
  ): Promise<Indy.RevStates>

  // Get revocation status for credential (given a from-to)
  // Note from-to interval details: https://github.com/hyperledger/indy-hipe/blob/master/text/0011-cred-revocation/README.md#indy-node-revocation-registry-intervals
  getRevocationStatus(
    credentialRevocationId: string,
    revocationRegistryDefinitionId: string,
    requestRevocationInterval: IndyRevocationInterval
  ): Promise<{ revoked: boolean; deltaTimestamp: number }> 
}