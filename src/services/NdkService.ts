import NDK, { NDKConstructorParams } from "@nostr-dev-kit/ndk";

export class NdkService {
    private static instance: NdkService | null = null; // Singleton instance of NdkService
    private ndk: NDK | null = null; // Singleton instance of NDK

    private readonly defaultRelays: string[] = [
        "wss://relay.geekiam.services",
        "wss://relay.damus.io",
        "wss://relay.primal.net"
    ];

    private readonly outBoxRelays: string[] = [
        "wss://purplepag.es",
        "wss://relay.primal.net",
    ];

    // Private constructor to enforce singleton pattern
    private constructor() {}

    // Getter for the singleton instance of NdkService
    public static getInstance(): NdkService {
        if (!NdkService.instance) {
            NdkService.instance = new NdkService();
        }
        return NdkService.instance;
    }

    // Method to create or retrieve the already initialized NDK instance
    public async getNDK(): Promise<NDK> {
        if (!this.ndk) {
            const ndkOpts: NDKConstructorParams = {
                explicitRelayUrls: this.defaultRelays,
                outboxRelayUrls: this.outBoxRelays,
                clientName: "nostr-cli",
            };

            this.ndk = new NDK(ndkOpts);
            await this.ndk.connect();
        }
        return this.ndk;
    }
}