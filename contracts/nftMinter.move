module arcadia::nft_mint {
    use std::vector;
    use aptos_framework::account;
    use aptos_framework::event;
    use aptos_framework::timestamp;
    use aptos_std::simple_map::{Self, SimpleMap};

    // ======== Constants ========
    const MAX_SUPPLY: u64 = 10000;
    const MINT_PRICE: u64 = 100;

    // ======== Core Structures ========
    struct NFTCollection has key {
        token_data: SimpleMap<u64, TokenData>,
        mint_count: u64,
        owner: address
    }

    struct MintEvents has key {
        mint_started_events: event::EventHandle<MintStartedEvent>,
        mint_completed_events: event::EventHandle<MintCompletedEvent>
    }

    struct MintStartedEvent has drop, store {
        token_id: u64,
        minter: address,
        timestamp: u64
    }

    struct MintCompletedEvent has drop, store {
        token_id: u64,
        owner: address
    }

    // ======== Module Initialization ========
    fun init_module(creator: &signer) {
        let creator_addr = std::signer::address_of(creator);

        move_to(creator, NFTCollection {
            token_data: simple_map::create(),
            mint_count: 0,
            owner: creator_addr
        });

        move_to(creator, MintEvents {
            mint_started_events: account::new_event_handle<MintStartedEvent>(creator),
            mint_completed_events: account::new_event_handle<MintCompletedEvent>(creator)
        });
    }
}
