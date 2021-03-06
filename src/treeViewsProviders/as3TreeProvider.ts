import * as vscode from 'vscode';
import { getPassword } from '../utils/utils'
import { ext } from '../extensionVariables';
// import { callHTTPS } from '../utils/externalAPIs'

export class as3TreeProvider implements vscode.TreeDataProvider<as3Item> {

	private _onDidChangeTreeData: vscode.EventEmitter<as3Item | undefined> = new vscode.EventEmitter<as3Item | undefined>();
	readonly onDidChangeTreeData: vscode.Event<as3Item | undefined> = this._onDidChangeTreeData.event;

	constructor(private workspaceRoot: string) {
	}

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}

	getTreeItem(element: as3Item): vscode.TreeItem {
		return element;
	}

	async getChildren(element?: as3Item): Promise<as3Item[]> {

		var device = ext.hostStatusBar.text

		if (!device) {
			return Promise.reject('Select device to get as3 task info');
			// return Promise.resolve('');
		}

		const password = await getPassword(device);
		const decCall = await ext.f5Api.as3Tasks(device, password);
		// const taskHeader: as3Item = new as3Item(
		// 	'AS3 Tasks',
		// 	'',
		// 	'',
		// 	vscode.TreeItemCollapsibleState.Collapsed,
		// 	{
		// 		command: '',
		// 		title: '',
		// 		arguments: ['none']
		// 	}
		// );
		
		// if (decCall.)
		
		
		const taskItems = decCall.body.items.map((item:any) => {

			const taskId = item.id
			const shortId = taskId.split('-').pop();
			var timeStamp

			// if no decs in task or none on box, it returns limited details, but the request still gets an ID, so we blank in what's not there
			if (item.declaration.hasOwnProperty('controls')){
				timeStamp = item.declaration.controls.archiveTimestamp
			} else {
				timeStamp = ''
			}

			// var timeStamp = item.declaration.controls.archiveTimestamp ?
			// 	item.declaration.controls.archiveTimestamp || '' : '';


			// TODO: loop through entire dec, add all tenant names, if there are multiple
			const decTenant = item.results[0].tenant

			return new as3Item(
				shortId,
				timeStamp,
				decTenant,
				vscode.TreeItemCollapsibleState.None, 
				{
					command: 'f5-as3.getTask',
					title: 'hostTitle',
					arguments: [taskId]
				}
			)
		})

		// var treeItems =  [taskHeader: [taskItems]]
		var treeItems =  taskItems
		// treeItems = taskItems
        return Promise.resolve(treeItems);
	}
    

}

export class as3Item extends vscode.TreeItem {
	constructor(
		public readonly label: string,
		private version: string,
		private toolTip: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
		public readonly command?: vscode.Command
	) {
		super(label, collapsibleState);
	}

	get tooltip(): string {
		return this.toolTip;
	}

	get description(): string {
		return this.version;
	}

	// iconPath = {
	// 	light: path.join(__filename, '..', '..', 'resources', 'light', 'dependency.svg'),
	// 	dark: path.join(__filename, '..', '..', 'resources', 'dark', 'dependency.svg')
	// };

    // contextValue = 'dependency';
    
}