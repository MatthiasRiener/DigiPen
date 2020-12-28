
  export const template = `
        <div class="left-side-content">
          <p id="title-nav">Navigation</p>

          <div class="workspace-container">
            <div class="cur-workspace"></div>
            <p id="workspace-text">4BHITM<br />Workspace</p>
            <div class="workspace-arrows">
              <ion-icon name="chevron-up-outline"></ion-icon>
              <ion-icon name="chevron-down-outline"></ion-icon>
            </div>
          </div>

          <div class="nav-bar-element">
            <ion-icon name="albums-outline" class="icon-navbar"></ion-icon>
            <p>Dashboard</p>
          </div>

          <div class="nav-bar-element">
            <ion-icon name="checkbox-outline" class="icon-navbar"></ion-icon>
            <p>Tasks</p>
            <div class="notification-navbar"><p>3</p></div>
          </div>

          <div class="nav-bar-element">
            <ion-icon name="people-outline" class="icon-navbar"></ion-icon>
            <p>Workspaces</p>
            <ion-icon
              name="add-outline"
              style="margin-left: auto; margin-right: 15px"
              class="icon-navbar"
            ></ion-icon>
          </div>

          <div class="nav-bar-element">
            <ion-icon name="cog-outline" class="icon-navbar"></ion-icon>
            <p>Settings</p>
            <ion-icon
              name="chevron-down-outline"
              style="margin-left: auto; margin-right: 15px"
              class="icon-navbar"
            ></ion-icon>
          </div>

          <div class="nav-bar-element-subtask">
            <ion-icon name="sunny-outline" class="icon-navbar"></ion-icon>
            <p>Slidea</p>
          </div>

          <div class="nav-bar-element-subtask">
            <ion-icon name="person-outline" class="icon-navbar"></ion-icon>
            <p>Profile</p>
          </div>
        </div>
      </div>
`;
