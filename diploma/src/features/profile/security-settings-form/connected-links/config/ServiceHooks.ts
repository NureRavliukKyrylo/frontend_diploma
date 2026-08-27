export interface ServiceHook {
  trigger: () => void;
  isLoading: boolean;
}

export interface ConnectedServiceHooks {
  link: ServiceHook;
  unlink: ServiceHook;
}
