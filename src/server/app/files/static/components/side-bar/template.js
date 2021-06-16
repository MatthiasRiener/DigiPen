
export const template = `
<div class="left-side-content">

<div id="sidebar-scroller-container">

    <div id="side-bar-header-section">
        <h2>Slidea</h2>
    </div>

    <div id="side-bar-sections-container">
        <div id="side-bar-sections-tab">
            <div class="side-bar-sections-tab-item active-tab" id="general-tab">
                <p>General</p>
            </div>

            <div class="side-bar-sections-tab-item" id="other-tab">
                <p>Other</p>
            </div>
        </div>
    </div>

    <div id="other-section" style="display: none">

        

        <div id="teams-title">
            <p>Help us!</p>
        </div>

        <div class="nav-bar-element report-bug-item" id="reportBug">
            <ion-icon name="alert" class="icon-navbar"></ion-icon>
            <p>Report Issue</p>
        </div>


        <div id="teams-title">
            <p id="organizations-title">Organizations</p>
            <ion-icon name="add-outline" style="margin-left: auto; margin-right: 15px"
                class="icon-navbar add-workspace-btn"></ion-icon>
        </div>
        <div id="workspace-container-filler">

        </div>
    </div>

    <div id="general-section">

        <div id="teams-title">
            <p>Overview</p>
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
            <div class="soon-btn">
                <p>Soon</p>
            </div>

        </div>


        <div id="teams-title">
            <p>Account</p>
        </div>


        <div class="nav-bar-element profile-item">
        <ion-icon name="cog" class="icon-navbar"></ion-icon>
        <p>Settings</p>
    </div>

        <div class="nav-bar-element notification-item" id="notification">
            <ion-icon name="notifications" class="icon-navbar"></ion-icon>
            <p>Notifications</p>
            <div class="soon-btn">
              <p id="notifications-count"> Free</p>
            </div>
        </div>

        <div class="nav-bar-element soon-item">
            <ion-icon name="wallet" class="icon-navbar"></ion-icon>
            <p>Payment</p>
            <div class="soon-btn">
                <p>Free</p>
            </div>

        </div>


    

        <div id="teams-title">
        <p>Logout</p>
    </div>
        <div class="nav-bar-element logout-item" id="logout">
            <ion-icon name="log-out" class="icon-navbar"></ion-icon>
            <p>Log Out</p>
        </div>
    </div>
</div>
<div id="profile-image-container-sidebar">
    <div id="profile-image">
    </div>
    <div id="side-bar-navigation-info">
        <p id="profile-container-username">Max Mustermann</p>
        <p id="profile-container-email">maxmustermann@anonym.com</p>
    </div>

    <ion-icon id="profile-ellipses" name="ellipsis-vertical"></ion-icon>
</div>


</div>
`;
