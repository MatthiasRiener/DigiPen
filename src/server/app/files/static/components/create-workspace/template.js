
  export const template =
    `
    <div id="background-workspace-container"></div>
    <div class="workspace-container">
        <div class="left-side-container">
            <p id="workspace-title">Create Workspace</p>
            <p class="textfield-title">Name</p>
            <input id="workspaceName" type="text" placeholder="Name" />
            <p class="textfield-title">Invite Users</p>
            <textarea id="workspaceUsers" class="inv-user-txt" placeholder="Name"></textarea>
            <div class="btn-create-ws"><p>Create</p></div>
        </div>
        <div class="right-side-container">
            <div class="workplace-picture"></div>
        </div>
    </div>
    `;
