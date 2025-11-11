import { SvelteSet } from 'svelte/reactivity';

export class SelectedStore {
	private selected: Set<string> = new SvelteSet<string>();

	select(path: string) {
		this.selected.add(path);
	}

	deselect(path: string) {
		this.selected.delete(path);
	}

	toggle(path: string) {
		if (this.selected.has(path)) {
			this.selected.delete(path);
		} else {
			this.selected.add(path);
		}
	}

	isSelected(path: string): boolean {
		return this.selected.has(path);
	}

	isInSelectedFolder(path: string): boolean {
		for (const selectedPath of this.selected) {
			if (path.startsWith(selectedPath + '/')) {
				return true;
			}
		}
		return false;
	}

	clear() {
		this.selected.clear();
	}

	getAll(): string[] {
		return Array.from(this.selected);
	}
}