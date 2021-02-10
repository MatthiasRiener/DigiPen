
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

          <div class="nav-bar-element dashboard-item">
            <ion-icon name="albums-outline" class="icon-navbar"></ion-icon>
            <p>Dashboard</p>
          </div>

          <div class="nav-bar-element task-item">
            <ion-icon name="checkbox-outline" class="icon-navbar"></ion-icon>
            <p>Tasks</p>
            <div class="notification-navbar"><p>3</p></div>
          </div>

          <div class="nav-bar-element">
            <ion-icon name="people-outline" class="icon-navbar"></ion-icon>
            <p>Workspace</p>
            <ion-icon
              name="add-outline"
              style="margin-left: auto; margin-right: 15px"
              class="icon-navbar add-workspace-btn"
            ></ion-icon>
          </div>

          <div class="nav-bar-element quiz-item">
            <ion-icon name="stats-chart-outline" class="icon-navbar"></ion-icon>
            <p>Quiz</p>
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

          <div class="nav-bar-element notification-item" id="notification">
            <ion-icon name="notifications-outline" class="icon-navbar"></ion-icon>
            <p>Notifications</p>
          </div>

          <div class="nav-bar-element-subtask profile-item">
            <ion-icon name="person-outline" class="icon-navbar"></ion-icon>
            <p>Profile</p>
          </div>

          <div class="nav-bar-element logout-item" id="logout">
            <ion-icon name="log-out-outline" class="icon-navbar"></ion-icon>
            <p>Log Out</p>
          </div>
        </div>
      </div>
`;
