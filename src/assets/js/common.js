var frontCommon = frontCommon || {};
frontCommon.Html = (function () {
    var instance = null;
    function init() {
        instance = {
        reset: function () {
            frontCommonResize();
            //frontCommonScroll();
            header();
            },
        };
    return instance;
    }
    if (instance) {
        return instance;
    } else {
        return init();
    }
})();

function frontCommonResize() {
    window.addEventListener("resize", () => {
        const _header = document.getElementById("header")
        const modalShow = document.querySelector(".modal.show");
        if(modalShow) {
            _header.classList.add("regular")
        }
    });
}

function frontCommonScroll() {
    window.addEventListener("scroll", () => {

    });
}

function header() {
    const body = document.querySelector("body")
    const _header = document.getElementById("header")
    const depth1Item = _header.querySelectorAll(".depth1-item")
    const depth1All = document.querySelectorAll('.depth1')
    const depth2WrapAll = document.querySelectorAll(".depth2-wrap")
    const siteNavi = _header.querySelector(".site-navi")

if (_header) {
    window.addEventListener("resize", () => {
        const _width = window.innerWidth
        if(_width >= 1024) {
            _header.classList.remove("open")
            _header.removeAttribute("style")

            for (const item of depth1All) {
                item.classList.remove("active")
            }
            for (const item of depth2WrapAll) {
                item.removeAttribute("style")
            }

            body.style.overflow = "auto";
        }
    })

    _header.querySelectorAll("*").forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            depth1Item.forEach(depth1Item => {
                depth1Item.classList.remove("active");
            })
            let hoverdepth1 = e.target.closest(".depth1-item")
            if(hoverdepth1) {
                siteNavi.classList.remove("close")
                hoverdepth1.classList.add("active")
            }
            if(!e.target.closest(".site-navi")) {
                siteNavi.classList.add("close")
            }
        });
    })

    // 언어 셀렉트버튼 기능
    const lang = document.getElementById("lang")
    const selected = lang.querySelector(".selected")
    const optionArea = lang.querySelector(".option-area")

    selected.addEventListener("click", function () {
      optionArea.classList.contains("active") ? optionArea.classList.remove("active") : optionArea.classList.add("active")
    })

    //

    _header.addEventListener("mouseenter", () => {
        _header.classList.add("hover")
    })
    _header.addEventListener("mouseleave", () => {
        _header.classList.remove("hover")
    })

    document.addEventListener("focusin", function(e) {
        const _target = e.target
        if(_target.closest(".dark") || _target.closest(".transparent")) {
            _header.classList.add("hover")
        } else {
            _header.classList.remove("hover")
        }
    })

    // MO > 메뉴 열기/닫기
    const navi = _header.querySelector(".site-navi")
    const util = _header.querySelector(".site-util")
    const menuHeader = _header.querySelector(".btn.menu-header")
    const menuHeadertxt = menuHeader.querySelector(".btn-text")

    let i = 1;
    for (const item of depth1Item) {
        item.style.animationDelay = (0.15 * i) + "s";
        i++;
    }

    menuHeader.addEventListener("click", function() {
        if(_header.classList.contains("open")) {
            body.style.overflow = "auto";
            menuHeadertxt.innerHTML = "메뉴 열기"
            _header.style.height = "5.8rem"
            setTimeout(() => {
                _header.classList.remove("open")
                for (const item of depth1All) {
                    item.classList.remove("active")
                }
                for (const item of depth2WrapAll) {
                    item.classList.remove("active")
                    $(".depth2-wrap").slideUp(300);
                }
            }, 300);
        } else {
            body.style.overflow = "hidden";
            menuHeadertxt.innerHTML = "메뉴 닫기"
            navi.style.display = "block"
            util.style.display = "flex"
            _header.style.height = "100%"
            setTimeout(() => {
                _header.classList.add("open")
            }, 300);
        }
    })

    // MO > depth1 드롭다운 열림/닫힘 기능
    document.addEventListener("click", function (e) {
        const depth1 = e.target
        if (depth1.classList.contains("depth1")) {
            const _width = window.innerWidth
            if (_width < 1024) {
            if (depth1.classList.contains("active")) {
                depth1.classList.remove("active")
                $(".depth2-wrap").slideUp(300);
            } else {
                $(".depth2-wrap").slideUp(300);
                depth1All.forEach(all => {
                all.classList.remove("active")
                });
                depth1.classList.add("active")
                $(".depth1.active ~.depth2-wrap").slideDown(300);
            }
            }
        }
        })
    }
}


/* 아코디언 */
function Accordion() {
    const accordionDisplays = document.querySelectorAll(".accordion-display");

    accordionDisplays.forEach(function(accordionDisplay) {
        const accordionItems = accordionDisplay.querySelectorAll(".accordion-item");

        accordionItems.forEach(function(accordionItem) {
            const button = accordionItem.querySelector(".btn");

            // aria-label 값 토글
            function toggleAccordion() {
                const ariaLabel = this.getAttribute("aria-label");
                this.setAttribute("aria-label", ariaLabel === "열림" ? "닫힘" : "열림");
            }

            if (button) {
                button.addEventListener("click", toggleAccordion.bind(button));
            }

            const accordionHeads = accordionItem.querySelectorAll(".accordion-head");
            accordionHeads.forEach(accordionHead => {
                accordionHead.addEventListener("click", function() {
                    const panel = this.nextElementSibling;
                    if (panel) {
                        if (accordionItem.classList.contains("active")) {
                            accordionItem.classList.remove("active");
                            panel.style.height = 0;
                            setTimeout(() => {
                                panel.style.overflow = "hidden"; // overflow hidden
                            }, 100);
                        } else {
                            accordionItem.classList.add("active");
                            panel.style.height = panel.scrollHeight + "px";
                            setTimeout(() => {
                                panel.style.overflow = "visible"; // overflow visible
                            }, 100);
                        }
                    }
                });
            });
        });

        // 초기 상태 설정 : collapse 클래스가 .accordion-display에 있으면 열림 상태의 아코디언이 됩니다.
        if (accordionDisplay.classList.contains("collapse")) {
            openAllAccordions(accordionItems);
        } else {
            closeAllAccordions(accordionItems);
        }
        function openAllAccordions(items) {
            items.forEach(item => {
                item.classList.add("active");
                const panel = item.querySelector(".accordion-head + *");
                if (panel) {
                    panel.style.height = panel.scrollHeight + "px";
                    panel.style.overflow = "visible"; // overflow visible
                }
            });
        }
        function closeAllAccordions(items) {
            items.forEach(item => {
                item.classList.remove("active");
                const panel = item.querySelector(".accordion-head + *");
                if (panel) {
                    panel.style.height = 0;
                    panel.style.overflow = "hidden"; // overflow hidden
                }
            });
        }
    });

    // resize시 height 조정
    window.addEventListener("resize", function() {
        accordionDisplays.forEach(function(accordionDisplay) {
            const accordionItems = accordionDisplay.querySelectorAll(".accordion-item");
            accordionItems.forEach(function(accordionItem) {
                const panel = accordionItem.querySelector(".accordion-head + *");
                if (accordionItem.classList.contains("active")) {
                    panel.style.height = 'auto';
                    const scrollHeight = panel.scrollHeight;
                    panel.style.height = scrollHeight + "px";
                }
            });
        });
    });
}