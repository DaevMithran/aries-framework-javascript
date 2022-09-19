export const InjectionSymbols = {
  Wallet: Symbol('Wallet'),
  MessageRepository: Symbol('MessageRepository'),
  StorageService: Symbol('StorageService'),
  Logger: Symbol('Logger'),
  GenericIndyLedgerService: Symbol('GenericIndyLedgerService'),
  GenericIssuerService: Symbol('GenericIssuerService'),
  GenericHolderService: Symbol('GenericHolderService'),
  GenericVerifierService: Symbol('GenericVerifierService'),
  GenericRevocationService: Symbol('GenericRevocationService'),
}

export const DID_COMM_TRANSPORT_QUEUE = 'didcomm:transport/queue'
