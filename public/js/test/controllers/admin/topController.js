var TopController = TopController || {}

TopController = {
    init: function () {
        TopController.events.getOrderToday();
        TopController.events.getOrderExport();
    },
    events: {
        getOrderToday: function (page) {
            CommonSettings.events.showProcessingOverlay();

            $.ajax({
                type: 'GET',
                url: '/Admin/Top/GetOrderToday',
                data: { page: page },
                success: function (html) {
                    $("#implementdata").empty().html(html);
                    TopController.paginationData.init();
                    CommonSettings.events.hideProcessingOverlay();
                },
                error: function (err) {
                    CommonSettings.events.hideProcessingOverlay();
                }
            })
        },

        getOrderExport: function (page) {
            CommonSettings.events.showProcessingOverlay();

            $.ajax({
                type: 'GET',
                url: '/Admin/Top/GetOrderFailureToDeliver',
                data: { page: page },
                success: function (html) {
                    $("#implementdata1").empty().html(html);
                    TopController.paginationData.init();
                    CommonSettings.events.hideProcessingOverlay();
                },
                error: function (err) {
                    CommonSettings.events.hideProcessingOverlay();
                }
            });
        }
    },

    paginationData: {
        init: function () {
            $("#implementdata .paginationCustom li a").on("click", TopController.paginationData.events.pagingOrderToday);
            $("#implementdata1 .paginationCustom li a").on("click", TopController.paginationData.events.pagingOrderExport);
        },

        events: {
            pagingOrderToday: function (event) {
                event.preventDefault();

                var page = $(this).attr('href') != undefined ? $(this).attr('href').split("page=")[1].split("&")[0] : '';
                if ($(this).css('cursor') != "not-allowed") {
                    TopController.events.getOrderToday(page);
                }

                return false;
            },

            pagingOrderExport: function (event) {
                event.preventDefault();

                var page = $(this).attr('href') != undefined ? $(this).attr('href').split("page=")[1].split("&")[0] : '';
                if ($(this).css('cursor') != "not-allowed") {
                    TopController.events.getOrderExport(page);
                }

                return false;
            }
        }
    }
}

$(document).ready(function () {
    TopController.init();
});