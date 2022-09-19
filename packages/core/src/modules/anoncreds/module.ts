import type { DependencyManager } from '../../plugins'

import { module } from '../../plugins'

import { IndyVerifierService, IndyIssuerService, IndyHolderService, IndyRevocationService, IndyUtilitiesService } from './services/indy'
import { CheqdVerifierService, CheqdIssuerService, CheqdHolderService, CheqdRevocationService, CheqdUtilitiesService } from './services/cheqd'
import { InjectionSymbols } from '../../constants'

@module()
export class IndyModule {
  public static register(dependencyManager: DependencyManager) {
    // indy
    dependencyManager.registerSingleton(IndyIssuerService)
    dependencyManager.registerSingleton(IndyHolderService)
    dependencyManager.registerSingleton(IndyVerifierService)
    dependencyManager.registerSingleton(IndyRevocationService)
    dependencyManager.registerSingleton(IndyUtilitiesService)

    // cheqd
    dependencyManager.registerSingleton(CheqdIssuerService)
    dependencyManager.registerSingleton(CheqdHolderService)
    dependencyManager.registerSingleton(CheqdVerifierService)
    dependencyManager.registerSingleton(CheqdRevocationService)
    dependencyManager.registerSingleton(CheqdUtilitiesService)

    dependencyManager.registerSingleton(InjectionSymbols.GenericIssuerService, IndyIssuerService)
    dependencyManager.registerSingleton(InjectionSymbols.GenericHolderService, IndyHolderService)
    dependencyManager.registerSingleton(InjectionSymbols.GenericVerifierService, IndyVerifierService)
    dependencyManager.registerSingleton(InjectionSymbols.GenericRevocationService, IndyRevocationService)
  }
}
