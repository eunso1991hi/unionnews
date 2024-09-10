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

const basePath = window.location.hostname === 'localhost' ? '/' : '/unionnews/';
document.querySelectorAll('a.depth1').forEach(link => {
    link.href = basePath + link.getAttribute('href');
});

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
    const depth1All = document.querySelectorAll('.depth1')
    const depth2WrapAll = document.querySelectorAll(".depth2-wrap")

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