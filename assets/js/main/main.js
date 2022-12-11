// ---------------HEADER-------------------

// toggle show search-box
const headerSearchBtn = document.querySelector('.header .header-search-btn')
const headerSearchBox = document.querySelector('.header .header-search-box')
const headerSearchBoxInput = document.querySelector('.header .header-search-box input')
const headerCloseSearchBtn = document.querySelector('.header .header-close-btn')

if (headerSearchBtn) {
    
    headerSearchBtn.addEventListener('click', () => {
        headerSearchBox.classList.remove('d-none')
        headerSearchBoxInput.focus()
    })

}

headerCloseSearchBtn.addEventListener('click', () => {
    headerSearchBox.classList.add('d-none')
})

headerSearchBox.addEventListener('focusout', (event) => {
    headerSearchBox.classList.add('d-none')
});

// toggle show dropdowns megasubmenu
const headerDropdownsMegaSubMenu = document.querySelectorAll('.dropdown-menu .has-megasubmenu > a')
const headerDropdowns = document.querySelectorAll('.header .dropdown')

headerDropdownsMegaSubMenu.forEach(item => {
    item.addEventListener('click', (event) => {
        event.preventDefault()

        if(window.innerWidth > 576) return

        // if exist another active megamenu come deactive 
        const beforeEl = document.querySelector('.dropdown-menu .has-megasubmenu > .dropdown-item.show')
        if(beforeEl && beforeEl != item){
            beforeEl.classList.remove('show')
            beforeEl.nextElementSibling.classList.remove('show')
        }

        // change status 
        item.classList.toggle('show')
        item.nextElementSibling.classList.toggle('show')
    })
})

headerDropdowns.forEach(item => {
    item.addEventListener('hidden.bs.dropdown', () => {
        // if exist another show megamenu come deactive 
        const beforeEl = document.querySelector('.dropdown-menu .has-megasubmenu > .dropdown-item.show')
        if(beforeEl){
            beforeEl.classList.remove('show')
            beforeEl.nextElementSibling.classList.remove('show')
        }
    })
})

// when header is mobile size come when scrolled page hide the title
const headerTitle = document.querySelector('.header .header-nav-info')
const headerContent = document.querySelector('.header .header-content')

function showOrHideHeaderTitle(){
    // when page is computer size come show title
    if(window.innerWidth <= 650){
        headerTitle.classList.add('d-none')
        
        // convert breadcrumb to the header-footer
        headerFooter.appendChild(headerBreadcrumbs)
        headerFooter.classList.remove('d-none')
    }
    else {
        headerTitle.classList.remove('d-none')
        
        // convert breadcrumb to the header-footer
        headerNavInfo.appendChild(headerBreadcrumbs)
        headerFooter.classList.add('d-none')
    }
}

function UpDownHeaderTitle(){
    
    if(window.pageYOffset >= 50 && window.innerWidth <= 650){
        headerFooter.classList.add('goUp')
        headerContent.classList.add('static-height')
    }
    else{
        headerFooter.classList.remove('goUp')
        headerContent.classList.remove('static-height')
    }

}

// when on the header-content hovered show the headerTitle = headerInfo
headerContent.addEventListener('mouse', () => {
    headerFooter.classList.add('goUp')
})

$(function () {
    $(".header .header-content").hover(function () {
        if(window.pageYOffset >= 50 && window.innerWidth <= 650)
            headerFooter.classList.remove('goUp')
    }, function () {
        if(window.pageYOffset >= 50 && window.innerWidth <= 650)
            headerFooter.classList.add('goUp')
    });
});


// when the windozie be 496px to down => come => megasubmenu open in down of item.
const checkMegaSubMenuOpenInDownOrNo = () => {
    const megasubmenus = document.querySelectorAll('.megasubmenu')

    if(window.innerWidth <= 496){
        megasubmenus.forEach(item => {
            item.classList.add('position-static')
        })
    }
    else{
        megasubmenus.forEach(item => {
            item.classList.remove('position-static')
        })    
    }

    // $('.megasubmenu-item-btn').click(function (event) {
    //     if (window.innerWidth > 496)
    //       return
    
    //     event.preventDefault();
    
    //     // Find Parent of Clicked Item
    //     let parent1 = $(this).parent('.has-megasubmenu');
    
    //     parent1.find('.megasubmenu').slideToggle()
    //     parent1.toggleClass('open');
    
    //     parent1.siblings('.has-megasubmenu').find('.megasubmenu').slideUp();
    //     parent1.siblings('.has-megasubmenu').removeClass('open');
    // })

}



const headerFullscreenBtn = document.querySelector('.header .fullscreen-btn')
let pageFullScreen = false

headerFullscreenBtn.addEventListener('click', () => {
    openFullscreen()
})

document.addEventListener('fullscreenchange', () => {
    pageFullScreen = !pageFullScreen
})

function openFullscreen() {
    if(!pageFullScreen){
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.webkitRequestFullscreen) { /* Safari */
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) { /* IE11 */
            document.documentElement.msRequestFullscreen();
        }
    }
    else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitexitFullscreen) { /* Safari */
            document.webkitexitFullscreen();
        } else if (document.msexitFullscreen) { /* IE11 */
            document.msexitFullscreen();
        }
    }
}

// dark mode btn
const darkModeBtnHeader = document.querySelector('.header .dark-mode-btn')
const darkModeBtnHeaderLightIcon =  darkModeBtnHeader.querySelector('.dark-mode-light-icon')
const darkModeBtnHeaderDarkIcon =  darkModeBtnHeader.querySelector('.dark-mode-dark-icon')
darkModeBtnHeader.addEventListener('click', toggleDarkMode)

function toggleDarkMode(){
    // should change to light
    if(document.body.classList.contains('dark')){

        if(layoutStyle.darkMode != '')
            document.body.classList.remove(layoutStyle.darkMode)
        else
            document.body.classList.remove('dark-mode-1')
    
        document.body.classList.remove('dark')

        // save to the localstorage
        localStorage.setItem('dark-mode', JSON.stringify(false))
    }
    // should change to dark 
    else {
        if(layoutStyle.darkMode != '')
            document.body.classList.add(layoutStyle.darkMode)
        else
            document.body.classList.add('dark-mode-1')

        // save to the localstorage
        localStorage.setItem('dark-mode', JSON.stringify(true))
        
        document.body.classList.add('dark')
    }
    
}

// when window be mobile size come push collapsible-buttons to the dropdown
const collapsibleDropdownHeader = document.querySelector('.collapsible-dropdown')

// get buttons on the collapsible-buttons 
const buttonsCollapsibleSection = document.querySelector('.collapsible-buttons')
const buttonsCollapsibleButtons = document.querySelectorAll('.collapsible-buttons button')

function pushCollapsibleButttonsInTheDropdown(){
    const menu = collapsibleDropdownHeader.querySelector('.dropdown-menu .dropdown-menu-inner')

    // send buttons to the dropdown
    buttonsCollapsibleButtons.forEach(item => {
        menu.appendChild(item)
    })

    collapsibleDropdownHeader.classList.remove('d-none')
}

function putCollapsibleButttonsOfTheDropdown(){
    // put buttons of dropdown
    buttonsCollapsibleButtons.forEach(item => {
        buttonsCollapsibleSection.appendChild(item)
    })

    // hide the dropdown
    collapsibleDropdownHeader.classList.add('d-none')
}

function checkCollapsibleDropdownCanShowOrNO(){
    if(window.innerWidth <= 750){
        pushCollapsibleButttonsInTheDropdown()
    }
    else {
        putCollapsibleButttonsOfTheDropdown()
    }
}


// breadcrumbs in mini mobile size go to down of header box
const headerBreadcrumbs = document.querySelector('.header .header-content .breadcrumb')
const headerFooter = document.querySelector('.header .header-content > .card-footer')
const headerNavInfo = document.querySelector('.header .header-content .header-nav-info')

// ---------------HEADER-------------------

// ---------------SIDEBAR-------------------

// when on the header-toggle-btn clicked come full or mini content
const headerToggleBtn = document.querySelector('.header-toggle-btn')
const sidebarCloseMenuBtn = document.querySelector('.close-sidebar-menu-btn')
const sidebar = document.querySelector('.sidebar')
const header = document.querySelector('.header')
const backdrop = document.querySelector('.backdrop')
const main = document.querySelector('.main-content')

let sidebarStatus; // for saving last status of sidebar and header. 

headerToggleBtn.addEventListener('click', sidebarToggleShowMenu)
sidebarCloseMenuBtn.addEventListener('click', closeSidebarMenu)
backdrop.addEventListener('click', () => {
    closeSidebarMenu()
})

// for saving last status layout and do open and close menu
function sidebarToggleShowMenu(){
    // if window be laptop size come do
    if(window.innerWidth > 991){
        sidebar.classList.toggle('mini')
        main.classList.toggle('full')   
    }

    else {
        // if window be mobile size come show menu
        sidebar.classList.toggle('show')
        backdrop.classList.toggle('show')

        // get sidebar status
        sidebarStatus = sidebar.classList.contains('mini')
        
        if(sidebar.classList.contains('mini')){
            sidebar.classList.remove('mini')
            main.classList.remove('full')
        }
    }

    if(!sidebar.classList.contains('mini')){
        enableCollapseAndDisableTab()
    }

    // come enable event show tab
    if(sidebar.classList.contains('mini')){
        disableCollapseAndEnableTab()
    }        
}

// close the menu for size mobile and also it task is back layout status to Goes back to its latest style
function closeSidebarMenu(){
    sidebar.classList.remove('show')
    backdrop.classList.remove('show')   
    headerToggleBtn.classList.toggle('opened')

    // set sidebar status 
    if (sidebarStatus){
        sidebar.classList.add('mini')
        main.classList.add('full')

        if(!sidebar.classList.contains('mini')){
            enableCollapseAndDisableTab()
        }
    
        // come enable event show tab
        if(sidebar.classList.contains('mini')){
            disableCollapseAndEnableTab()
        }

    }
}

function disableCollapseAndEnableTab(){
    document.querySelectorAll('.sidebar .sidebar-item.has-sub:not(.sidebar-item-sub)').forEach(item => {
        enableSidebarItemSubInTheSide(item)
        item.querySelector('a').nextElementSibling.classList.add('d-none')
        // inja
    })

    document.querySelectorAll('.sidebar-item:not(.has-sub):not(.sidebar-item-sub)').forEach(item => {
        item.addEventListener('mouseenter', whenHoveredOnTheSidebarItemSimpleComeHideTabContent)
    })

    // if a item has active come deactive
    const itemActive = document.querySelector('.sidebar .sidebar-item.has-sub:not(.sidebar-item-sub).active-main')
    if(itemActive)
        itemActive.classList.replace('active-main', 'deactive')
}

function enableCollapseAndDisableTab(){
    // when be big sidebar come show the item.
    document.querySelectorAll('.sidebar .sidebar-item.has-sub:not(.sidebar-item-sub)').forEach(item => {
        item.querySelector('a').nextElementSibling.classList.remove('d-none')
        
        disableSidebarItemSubInTheSide(item)
    })

    document.querySelectorAll('.sidebar .sidebar-item:not(.has-sub):not(.sidebar-item-sub)').forEach(item => {
        item.removeEventListener('mouseenter', whenHoveredOnTheSidebarItemSimpleComeHideTabContent)
    })

    // if a item has active come active
    const itemDeactive = document.querySelector('.sidebar .sidebar-item.has-sub:not(.sidebar-item-sub).deactive')
    if(itemDeactive)
        itemDeactive.classList.replace('deactive', 'active-main')
}

// ------------Collapse system--------------
// open and close | sidebar collapse
const sidebarItemsHasSub = document.querySelectorAll('.sidebar .sidebar-item.has-sub .sidebar-link')
const sidebarItemsHasSubCollapses = document.querySelectorAll('.sidebar .sidebar-item.has-sub .collapse')

let assasHas = 0

sidebarItemsHasSub.forEach(element => {
    element.addEventListener('click', (event) => {
        let nextEl = element.nextElementSibling;
        let parentEl  = element.parentElement;	

        if(nextEl) {
            event.preventDefault();	
            let mycollapse = new bootstrap.Collapse(nextEl);
            
            if(nextEl.classList.contains('show')){
                mycollapse.hide();
            } else {
                mycollapse.show();
                
                let opened_submenu;
                // find other submenus with class=show
                if(parentEl.parentElement.nodeName == 'UL')
                    opened_submenu = parentEl.parentElement.querySelector('.collapse.show');
                else
                    opened_submenu = parentEl.parentElement.parentElement.querySelector('.collapse.show');

                // if it exists, then close all of them
                if(opened_submenu){

                    if(parentEl.parentElement.nodeName == 'UL' && opened_submenu.parentElement.parentElement == parentEl.parentElement){
                        new bootstrap.Collapse(opened_submenu);
                    }

                    else if(parentEl.parentElement.parentElement.nodeName == 'UL' && opened_submenu.parentElement.parentElement == parentEl.parentElement.parentElement){
                        new bootstrap.Collapse(opened_submenu);
                    }
                    
                    else if(parentEl.parentElement.nodeName == 'UL' && opened_submenu.parentElement.parentElement.parentElement == parentEl.parentElement){
                        new bootstrap.Collapse(opened_submenu);
                    }

                    else if(opened_submenu.parentElement.parentElement.nodeName == 'LI' && parentEl.parentElement.nodeName == 'LI'){
                        new bootstrap.Collapse(opened_submenu);
                    }

                    else if(opened_submenu.parentElement.parentElement.parentElement.classList.contains('card-body')){
                        const collapses = parentEl.parentElement.parentElement.querySelectorAll('.collapse.show')

                        if(collapses.length >= 2)
                            new bootstrap.Collapse(collapses[1]);                        

                        opened_submenu = parentEl.parentElement.querySelector('div > .collapse.show')
                        if(opened_submenu){
                                new bootstrap.Collapse(opened_submenu);                        
                        }
                    }

                }
            }
        }

    })
})


sidebarItemsHasSubCollapses.forEach(item => {
    item.addEventListener('show.bs.collapse', (event) => {
        // before el
        const beforeEl = event.target.parentElement.parentElement.querySelector('.has-sub.active-main')
        if(beforeEl && beforeEl != event.target.parentElement){
            if(Number(beforeEl.children[1].style.height.slice(0, -2)) > 1){
                setTimeout(() => {
                    new bootstrap.Collapse(beforeEl.children[1]);
                }, 500)
            }
        }

        event.target.parentElement.classList.add('active-main')
    })

    item.addEventListener('hide.bs.collapse', (event) => {
        event.target.parentElement.classList.remove('active-main')
    })
})

// ---------Collapse system--------

const sidebarTabContentMain = document.querySelector('.sidebar .sidebar-tab-content')
const sidebarTabContent = document.querySelector('.sidebar .sidebar-tab-content-inner')

function enableSidebarItemSubInTheSide(item){
    item.addEventListener('mouseenter', showSidebarItemSubInTheSide)
    sidebar.addEventListener('mouseleave', hideSidebarItemSubInTheSide)
}

function disableSidebarItemSubInTheSide(item){
    item.removeEventListener('mouseenter', showSidebarItemSubInTheSide)
    sidebar.removeEventListener('mouseleave', hideSidebarItemSubInTheSide)
}

function whenHoveredOnTheSidebarItemSimpleComeHideTabContent(){
    hideSidebarItemSubInTheSide()
}

function showSidebarItemSubInTheSide(event){
    // if tab is hide come show tab
    if(sidebarTabContentMain.classList.contains('d-none')){
        sidebarTabContentMain.classList.remove('d-none')
        sidebar.classList.add('pickup-radius')
    }

    const data = event.target.querySelector('.collapse .card')
    if(data){
        // if exist data of another sidebar-item come do
        const mainParent = document.querySelector('.sidebar-item.has-sub .im-last-item-tab-content')
        if(mainParent){
            mainParent.parentElement.classList.remove('active-main')
            mainParent.appendChild(sidebarTabContent.querySelector('.card'))
            mainParent.classList.remove('im-last-item-tab-content')
        }
        
        // push content to sidebar-tab-content
        data.parentElement.classList.add('im-last-item-tab-content')
        sidebarTabContent.appendChild(data)

        // item should change to active
        event.target.classList.add('active-main')
    }
}

function hideSidebarItemSubInTheSide(event){
    // if tab is not hide come hide tab
    if(!sidebarTabContentMain.classList.contains('d-none')){
        sidebarTabContentMain.classList.add('d-none')
        sidebar.classList.remove('pickup-radius')
    }

    // back data to the self collapse
    const mainParent = document.querySelector('.sidebar-item.has-sub .im-last-item-tab-content')
    if(mainParent){
        mainParent.parentElement.classList.remove('active-main')
        mainParent.appendChild(sidebarTabContent.querySelector('.card'))
        mainParent.classList.remove('im-last-item-tab-content')
    }
}


// active the menu
const sidebarItemSubActive = document.querySelector('.sidebar-item-sub.active')

function openMenu(){
    if(!sidebarItemSubActive)
        return
    else{
        // parent 1
        let parent = sidebarItemSubActive.parentElement.parentElement.parentElement.parentElement.parentElement
            
        if(parent.classList.contains('collapse'))
            parent = parent.parentElement

        if(parent.classList.contains('sidebar-item')){

            parent.classList.add('active')
            
            const collapse = parent.querySelector('.collapse')

            if(collapse){
                setTimeout(() => {
                    const bsCollapse = new bootstrap.Collapse(collapse)
                }, 600);
            }
        }
        else
            return

        // parent 2
        parent = parent.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
        if(parent.classList.contains('sidebar-items'))
            parent = sidebarItemSubActive.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement

        if(!parent.classList.contains('sidebar-item'))
            parent = sidebarItemSubActive.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement

        if(parent.classList.contains('sidebar-item')){

            parent.classList.add('active')
            
            const collapse = parent.querySelector('.collapse')

            if(collapse){
                setTimeout(() => {
                    const bsCollapse = new bootstrap.Collapse(collapse)
                }, 150);
            }
        }
        else
            return

        // parent 3
        parent = parent.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
        if(parent.classList.contains('sidebar-item')){

            const collapse = parent.querySelector('.collapse')

            if(collapse){
                setTimeout(() => {
                    const bsCollapse = new bootstrap.Collapse(collapse)
                }, 0);
            }

        }
        else
            return
    }
    
}

// ---------------SIDEBAR-------------------

// ---------------DOCUMENT EVENTS-------------------

document.addEventListener('DOMContentLoaded', () => {

    // use custom scroll in the header dropdowns
    $(".header .dropdown .tab-pane").mCustomScrollbar({
        theme: "dark-thin"
    }); 

    // use custom scroll for sidebar collapse
    $(".sidebar-content-inner").mCustomScrollbar({
        theme: "dark-thin",
        contentTouchScroll:true
    });

    // use custom scroll for sidebar-tab-content
    $(".sidebar-tab-content").mCustomScrollbar({
        theme: "dark-thin"
    });

    // use custom scroll for header dropdown-account
    // $(".header .dropdown.account .dropdown-menu .card-body").mCustomScrollbar({
    //     theme: "dark-thin"
    // });

    $(".card-scroll").mCustomScrollbar({
        theme: "dark-thin"
    });

    // use tooltips
    $("[data-bs-toggle='tooltip']").tooltip();
    document.querySelectorAll(".sidebar .sidebar-content .card-body [data-bs-toggle='tooltip']").forEach(item => {
        item.addEventListener('shown.bs.tooltip', () => {
            if(!sidebar.classList.contains('mini'))
                document.querySelector('.tooltip').classList.remove('show')
        })
    })

    // initialization app layout
    if(layoutStyle.main == 'full' && !main.classList.contains('full')){
        main.classList.add('full')
        sidebar.classList.add('mini')
        headerToggleBtn.classList.remove('opened')
    }   
    else {
        headerToggleBtn.classList.add('opened')
    }

    // --------------------
    if(!sidebar.classList.contains('mini')){
        enableCollapseAndDisableTab()
    }

    // come enable event show tab
    if(sidebar.classList.contains('mini')){
        disableCollapseAndEnableTab()
    } 
    // --------------------


    // when window be mobile size come push collapsible-buttons to dropdown
    checkCollapsibleDropdownCanShowOrNO()

    // check exist dark-mode or no
    const darkMode = JSON.parse(localStorage.getItem('dark-mode'))

    // if dark-mode enabled come apply to the website
    if(layoutStyle.darkMode != '' || darkMode){

        // if not exist dark-mode come set default dark mode
        if (layoutStyle.darkMode == '' ){
            layoutStyle.darkMode = 'dark-mode-1'
        }

        document.body.classList.add(layoutStyle.darkMode)
        document.body.classList.add('dark')
    }

    // show or hide the header-info ==> breadcrumbs and title
    showOrHideHeaderTitle()


    // when window size be 496px come open megasubmenu in the dropdown under the self item.
    checkMegaSubMenuOpenInDownOrNo()
})

window.addEventListener('resize', () => {
    checkCollapsibleDropdownCanShowOrNO()

    showOrHideHeaderTitle()    

    checkMegaSubMenuOpenInDownOrNo()
})

window.addEventListener('scroll', () => {
    UpDownHeaderTitle()
})

// come open and show active-items
openMenu()

// ---------------DOCUMENT EVENTS-------------------

// -------------------LAYOUT COMPONENTS-------------------

// tooltip
$('button[data-bs-toggle=tooltip]')
const buttonsHasTooltip = document.querySelectorAll('button[data-bs-toggle=tooltip]')
buttonsHasTooltip.forEach(item => {
    item.addEventListener('click', () => {
        // get tooltip
        const element = document.querySelector('.tooltip')

        if(!element)
            return
        
        // hide the tooltip
        const tooltip = bootstrap.Tooltip.getOrCreateInstance(element)
        tooltip.hide()
    })
})

// -------------------LAYOUT COMPONENTS-------------------






// upload image - input-image
const uploadImageInput = document.querySelectorAll('.image-input-upload-input')
const uploadImageCancle = document.querySelectorAll('.image-input-cancle-btn')

// storage-images
let storageFileInput = []


uploadImageInput.forEach((item, index) => {
    item.addEventListener('input', () => {
        doUploadImage(item, index)
    })
})

uploadImageCancle.forEach((item, index) => {

    storageFileInput.push(item.parentElement.querySelector('img').src)

    item.addEventListener('click', () => {
        
        if(item.parentElement.querySelector('img').src == storageFileInput[index]){
            removeImageInput(item, index)
        }
        else{
            putbeforeImageInput(item, index)
        }

    })

    checkUploadImage(item)
})

function doUploadImage(item, index){
    const image = item.parentElement.parentElement.parentElement.querySelector('img');
    const file    = item.files[0];
    const reader  = new FileReader();
    
    reader.onloadend = function () {
        image.src = reader.result
    }

    if (file) {
        storageFileInput[index] = image.src
        reader.readAsDataURL(file);
        item.classList.remove('d-none')
    } else {
        image.src = "";
    }
    
}

function putbeforeImageInput(item, index){
    item.parentElement.querySelector('img').src = storageFileInput[index]
    storageFileInput[index] = item.parentElement.querySelector('img').src
}

function removeImageInput(item, index){
    item.parentElement.querySelector('img').src = 'https://secure.gravatar.com/avatar/338d5c74cb3d18ba58ad789c303f2f3d?s=96&d=https%3A%2F%2Fstatic.teamtreehouse.com%2Fassets%2Fcontent%2Fdefault_avatar-ea7cf6abde4eec089a4e03cc925d0e893e428b2b6971b12405a9b118c837eaa2.png&r=pg'

    item.classList.add('d-none')
}