<script lang="ts">
	import { signOut } from '@auth/sveltekit/client';
	import { ListBox, ListBoxItem, popup, type PopupSettings } from '@skeletonlabs/skeleton';
	let comboboxValue: string;
	const popupCombobox: PopupSettings = {
		event: 'focus-click',
		target: 'popupCombobox',
		placement: 'bottom-start',
		closeQuery: '.listbox-item'
	};
	export let name: string | null | undefined;
	export let imageUrl: string | null | undefined;
	export let email: string;
</script>

<button class="variant-glass-primary btn h-10 w-10 p-0" use:popup={popupCombobox}>
	<img src="{imageUrl}!" alt="user profile" referrerpolicy="no-referrer" />
</button>

<div class="card w-48 pb-2 shadow-xl" data-popup="popupCombobox">
	<ListBox rounded="rounded-none">
		<ListBoxItem
			bind:group={comboboxValue}
			name="medium"
			value="profile"
			hover="false"
			active="false"
			class="variant-glass-secondary cursor-default"
		>
			<p class="p-0 font-semibold leading-5 sm:text-lg sm:font-bold lg:leading-4">
				{name}
				<span class="overflow-hidden truncate text-xs font-light sm:font-normal">
					{email}
				</span>
			</p>
		</ListBoxItem>
		<ListBoxItem bind:group={comboboxValue} name="medium" value="Settings">
			<a href="/settings">Settings</a>
		</ListBoxItem>
		<ListBoxItem bind:group={comboboxValue} name="medium" value="television">
			<a href="/">Feed</a>
		</ListBoxItem>
		<ListBoxItem bind:group={comboboxValue} name="medium" value="television">
			<a href="/r/create">Create Community</a>
		</ListBoxItem>
		<hr />
		<ListBoxItem
			bind:group={comboboxValue}
			name="medium"
			value="television"
			class=" hover:bg-red-300"
		>
			<button on:click={() => signOut({ callbackUrl: '/' })}>Log Out</button>
		</ListBoxItem>
	</ListBox>
</div>
