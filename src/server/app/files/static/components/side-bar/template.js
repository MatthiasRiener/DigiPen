
export const template = `
        <div class="left-side-content">
         
        <div id="teams-title" >
          <p>Navigation</p> 
        </div>

          <div class="nav-bar-element admin-item">
            <ion-icon name="analytics" class="icon-navbar"></ion-icon>
            <p>Admin-Panel</p>
          </div>


          <div class="nav-bar-element dashboard-item">
            <ion-icon name="layers" class="icon-navbar"></ion-icon>
            <p>Dashboard</p>
          </div>

          <div class="nav-bar-element task-item">
            <ion-icon name="checkbox" class="icon-navbar"></ion-icon>
            <p>Tasks</p>
          </div>

         

          <div class="nav-bar-element quiz-item soon-item">
            <ion-icon name="stats-chart" class="icon-navbar"></ion-icon>
            <p>Quiz</p>
            <div class="soon-btn"><p>Soon</p></div>

          </div>

          <div class="nav-bar-element notification-item" id="notification">
          <ion-icon name="notifications" class="icon-navbar"></ion-icon>
          <p>Notifications</p>
        </div>

          

          <div class="nav-bar-element profile-item">
            <ion-icon name="person" class="icon-navbar"></ion-icon>
            <p>Profile</p>
          </div>

          <div class="nav-bar-element report-bug-item" id="reportBug">
            <ion-icon name="bug" class="icon-navbar"></ion-icon>
            <p>Report Bug</p>
          </div>

          <div class="nav-bar-element logout-item" id="logout">
            <ion-icon name="log-out" class="icon-navbar"></ion-icon>
            <p>Log Out</p>
          </div>


          <div id="vert-spacer-side">
          </div>

          <div id="teams-title">
            <p>Teams</p> 
            <ion-icon
              name="add-outline"
              style="margin-left: auto; margin-right: 15px"
              class="icon-navbar add-workspace-btn"
            ></ion-icon>
          </div>
          <div class="team-item">
              <div class="team-banner"></div>
              <div class="team-name"><p>Management</p></div>
        </div>
      </div>
`;
