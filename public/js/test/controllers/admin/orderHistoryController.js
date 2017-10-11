var OrderHistoryController = OrderHistoryController || {};

OrderHistoryController = {
    model: {
        SearchAdminURL: null
    },
    init: function () {
        $("#StaffCode").on('change', OrderController.events.getAdmin);
        $("#btnSearchAdmin").on("click", OrderHistoryController.events.OpenDialogAdmin);
        $('input[type="submit"]').on('click', CommonSettings.events.isValidSubmit);
        $("#btnSearchCustomer").on("click", OrderController.events.openDialogCustomer);
        $("#btnSearchDelivery").on("click", OrderController.events.openDialogCustomer);
        $("#CodeCst").on('change', OrderController.events.getCustomer);
        $("#CodeDelivery").on('change', OrderController.events.getDelivery);
    },
    SearchAdmin: {
        init: function () {
            $("#searchAdminDialog .paginationCustom li a").on("click", OrderHistoryController.SearchAdmin.events.pagingSearchDialog);
            $("#searchAdminDialog #btnSearch").on("click", OrderHistoryController.SearchAdmin.events.searchByKeyword);
            $("#searchAdminDialog .btnSelectAdmin").on("click", OrderHistoryController.SearchAdmin.events.selectItem);
        },
        events: {
            pagingSearchDialog: function (event) {
                event.preventDefault();

                var page = $(this).attr('href') != undefined ? $(this).attr('href').split("page=")[1].split("&")[0] : '';

                if ($(this).css('cursor') != "not-allowed") {
                    CommonSettings.events.showProcessingOverlay();
                    $.ajax({
                        type: 'GET',
                        url: OrderHistoryController.model.SearchAdminURL,
                        data: { keyword: $("#searchAdminDialog #keyword").val(), page: page },
                        success: function (html) {
                            $("#searchAdminDialog").empty().html(html);
                            OrderHistoryController.SearchAdmin.init();
                            CommonSettings.events.hideProcessingOverlay();
                        },
                        error: function () {
                            CommonSettings.events.hideProcessingOverlay();
                        }
                    });
                }

                return false;
            },
            searchByKeyword: function (event) {
                event.preventDefault();
                CommonSettings.events.showProcessingOverlay();
                $.ajax({
                    type: 'GET',
                    url: OrderHistoryController.model.SearchAdminURL,
                    data: { keyword: $("#searchAdminDialog #keyword").val() },
                    success: function (html) {
                        $("#searchAdminDialog").empty().html(html);
                        OrderHistoryController.SearchAdmin.init();
                        CommonSettings.events.hideProcessingOverlay();
                    },
                    error: function () {
                        CommonSettings.events.hideProcessingOverlay();
                    }
                });

                return false;
            },
            selectItem: function (event) {
                event.preventDefault();

                var dataCodeCst = $(this).data("codecst");
                var dataName = $(this).data("name");
                $("#StaffCode").val(dataCodeCst);
                $("#AdminName").val(dataName);
                $("#searchAdminDialog").remove();
                $("#StaffCode").trigger("change");

                return false;
            }
        }
    },
    events: {
        OpenDialogAdmin: function (event) {
            event.preventDefault();

            var url = $(this).attr('href');
            CommonSettings.events.showProcessingOverlay();
            $.ajax({
                type: 'GET',
                url: url,
                success: function (html) {
                    $('<div id="searchAdminDialog" class="searchDialog"></div>').appendTo('body').html(html).dialog({
                        modal: true, title: '営業担当者検索', zIndex: 10020, autoOpen: true, width: 'auto', resizable: false,
                        open: function (event, ui) { $(".ui-dialog-titlebar-close").hide(); }, //閉じるボタン非表示
                        buttons: {
                            '閉じる': function () {
                                $(this).remove();
                            }
                        },
                        close: function (event, ui) {
                            $(this).remove();
                        }
                    });

                    OrderHistoryController.model.SearchAdminURL = url;
                    OrderHistoryController.SearchAdmin.init();
                    CommonSettings.events.hideProcessingOverlay();
                }
            });

            return false;
        }
    }
}