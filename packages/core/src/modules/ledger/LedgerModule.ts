import type { DependencyManager } from '../../plugins'
import type { CredentialDefinitionTemplate, SchemaTemplate } from './models/IndyLedgerService'
import type { NymRole } from 'indy-sdk'

import { InjectionSymbols } from '../../constants'
import { AriesFrameworkError } from '../../error'
import { injectable, module, inject } from '../../plugins'
import { Wallet } from '../../wallet/Wallet'

import { GenericIndyLedgerService } from './models/IndyLedgerService'
import { CheqdLedgerService, IndyPoolService, IndyLedgerService } from './services'

@module()
@injectable()
export class LedgerModule {
  private ledgerService: GenericIndyLedgerService
  private wallet: Wallet

  public constructor(
    @inject(InjectionSymbols.Wallet) wallet: Wallet,
    @inject(GenericIndyLedgerService) ledgerService: GenericIndyLedgerService
  ) {
    this.ledgerService = ledgerService
    this.wallet = wallet
  }

  /**
   * Connect to all the ledger pools
   */
  public async connectToPools() {
    await this.ledgerService.connectToPools()
  }

  public async registerPublicDid(did: string, verkey: string, alias: string, role?: NymRole) {
    const myPublicDid = this.wallet.publicDid?.did

    if (!myPublicDid) {
      throw new AriesFrameworkError('Agent has no public DID.')
    }

    return this.ledgerService.registerPublicDid(myPublicDid, did, verkey, alias, role)
  }

  public async getPublicDid(did: string) {
    return this.ledgerService.getPublicDid(did)
  }

  public async registerSchema(schema: SchemaTemplate) {
    const did = this.wallet.publicDid?.did

    if (!did) {
      throw new AriesFrameworkError('Agent has no public DID.')
    }

    return this.ledgerService.registerSchema(did, schema)
  }

  public async getSchema(id: string) {
    return this.ledgerService.getSchema(id)
  }

  public async registerCredentialDefinition(
    credentialDefinitionTemplate: Omit<CredentialDefinitionTemplate, 'signatureType'>
  ) {
    const did = this.wallet.publicDid?.did

    if (!did) {
      throw new AriesFrameworkError('Agent has no public DID.')
    }

    return this.ledgerService.registerCredentialDefinition(did, {
      ...credentialDefinitionTemplate,
      signatureType: 'CL',
    })
  }

  public async getCredentialDefinition(id: string) {
    return this.ledgerService.getCredentialDefinition(id)
  }

  public async getRevocationRegistryDefinition(revocationRegistryDefinitionId: string) {
    return this.ledgerService.getRevocationRegistryDefinition(revocationRegistryDefinitionId)
  }

  public async getRevocationRegistryDelta(
    revocationRegistryDefinitionId: string,
    fromSeconds = 0,
    toSeconds = new Date().getTime()
  ) {
    return this.ledgerService.getRevocationRegistryDelta(revocationRegistryDefinitionId, fromSeconds, toSeconds)
  }

  /**
   * Registers the dependencies of the ledger module on the dependency manager.
   */
  public static register(dependencyManager: DependencyManager) {
    // Api
    dependencyManager.registerContextScoped(LedgerModule)

    // Services
    dependencyManager.registerSingleton(GenericIndyLedgerService, CheqdLedgerService)
    dependencyManager.registerSingleton(IndyLedgerService)

    // TODO-CHEQD: do we need this?
    dependencyManager.registerSingleton(IndyPoolService)
  }
}
