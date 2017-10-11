var TopCustomerController = TopCustomerController || {}

TopCustomerController = {
    init: function () {
        TopCustomerController.events.getOrderCustomerToday();
        TopCustomerController.events.getOrderCustomerExport();
        TopCustomerController.events.getShowInfoToday();
    },
    events: {
        getOrderCustomerToday: function (page) {
            CommonSettings.events.showProcessingOverlay();

            $.ajax({
                type: 'GET',
                url: '/Top/GetOrderCustomerToday',
                data: { page: page },
                success: function (html) {
                    $("#implementdata").empty().html(html);
                    TopCustomerController.paginationData.init();
                    CommonSettings.events.hideProcessingOverlay();
                },
                error: function (err) {
                    CommonSettings.events.hideProcessingOverlay();
                }
            })
        },
        getOrderCustomerExport: function (page) {
            CommonSettings.events.showProcessingOverlay();

            $.ajax({
                type: 'GET',
                url: '/Top/GetOrderFailureToDeliverCustomer',
                data: { page: page },
                success: function (html) {
                    $("#implementdata1").empty().html(html);
                    TopCustomerController.paginationData.init();
                    CommonSettings.events.hideProcessingOverlay();
                },
                error: function (err) {
                    CommonSettings.events.hideProcessingOverlay();
                }
            });
        },
        getShowInfoToday: function (page) {
            CommonSettings.events.showProcessingOverlay();

            $.ajax({
                type: 'GET',
                url: '/Top/GetShowInfoToday',
                data: { page: page },
                success: function (html) {
                    $("#implementdata3").empty().html(html);
                    TopCustomerController.paginationData.init();
                    CommonSettings.events.hideProcessingOverlay();
                },
                error: function (err) {
                    CommonSettings.events.hideProcessingOverlay();
                }
            })
        }
    },
    paginationData: {
        init: function () {
            $("#implementdata .paginationCustom li a").on("click", TopCustomerController.paginationData.events.pagingOrderCustomerToday);
            $("#implementdata1 .paginationCustom li a").on("click", TopCustomerController.paginationData.events.pagingOrderCustomerExport);
            $("#implementdata3 .paginationCustom li a").on("click", TopCustomerController.paginationData.events.pagingInfo);
        },
        events: {
            pagingOrderCustomerToday: function (event) {
                event.preventDefault();

                var page = $(this).attr('href') != undefined ? $(this).attr('href').split("page=")[1].split("&")[0] : '';
                if ($(this).css('cursor') != "not-allowed") {
                    TopCustomerController.events.getOrderCustomerToday(page);
                }

                return false;
            },
            pagingOrderCustomerExport: function (event) {
                event.preventDefault();

                var page = $(this).attr('href') != undefined ? $(this).attr('href').split("page=")[1].split("&")[0] : '';
                if ($(this).css('cursor') != "not-allowed") {
                    TopCustomerController.events.getOrderCustomerExport(page);
                }

                return false;
            },
            pagingInfo: function (event) {
                event.preventDefault();

                var page = $(this).attr('href') != undefined ? $(this).attr('href').split("page=")[1].split("&")[0] : '';
                if ($(this).css('cursor') != "not-allowed") {
                    TopCustomerController.events.getShowInfoToday(page);
                }

                return false;
            },
        }
    }
}

$(document).ready(function () {
    TopCustomerController.init();
});
