var OrderHistoryController = OrderHistoryController || {};

OrderHistoryController = {
    model: {

    },
    init: function () {
        $("#CodeCst").on('change', OrderHistoryController.events.getCustomer);
        $('input[type="submit"]').on('click', CommonSettings.events.isValidSubmit);
        $("#btnSearchCustomer").on("click", OrderHistoryController.events.openDialogCustomer);
    },
    SearchCustomer: {
        init: function () {
            $("#searchCustomerDialog .paginationCustom li a").on("click", OrderHistoryController.SearchCustomer.events.pagingSearchDialog);
            $("#searchCustomerDialog #btnSearch").on("click", OrderHistoryController.SearchCustomer.events.searchByKeyword);
            $("#searchCustomerDialog .btnSelectCustomer").on("click", OrderHistoryController.SearchCustomer.events.selectItem);
        },
        events: {
            pagingSearchDialog: function (event) {
                event.preventDefault();

                if ($(this).css('cursor') != "not-allowed") {
                    var page = $(this).attr('href') != undefined ? $(this).attr('href').split("page=")[1].split("&")[0] : '';
                    CommonSettings.events.showProcessingOverlay();
                    $.ajax({
                        type: 'GET',
                        url: OrderHistoryController.model.SearchCustomerURL,
                        data: { keyword: $("#searchCustomerDialog #keyword").val(), page: page },
                        success: function () {
                            $("#searchCustomerDialog").empty().html(html);
                            OrderHistoryController.SearchCustomer.init();
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
                    url: OrderHistoryController.model.SearchCustomerURL,
                    data: { keyword: $("#searchCustomerDialog #keyword").val() },
                    success: function (html) {
                        $("#searchCustomerDialog").empty().html(html);
                        OrderHistoryController.SearchCustomer.init();
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

                // Reset errors
                $('span[data-valmsg-for="CodeCst"]').text('');
                $('span[data-valmsg-for="CodeDelivery"]').text('');
                CommonSettings.events.resetErrorArray('CodeCst');
                CommonSettings.events.resetErrorArray('CodeDelivery');
                CommonSettings.events.clearValueFromDisabledInput('CustomerName');
                CommonSettings.events.clearValueFromDisabledInput('NameDelivery');

                var dataCodeCst = $(this).data("codecst");
                var dataName = $(this).data("name");
                $("#CodeCst").val(dataCodeCst);
                CommonSettings.events.setValueToDisabledInput('CustomerName', dataName);
                CommonSettings.events.setValueToDisabledInput('NameDelivery', dataName);

                var post = $(this).data("post").toString();
                if (post != '') {
                    $("#Post1").val(post.substr(0, 3));
                    $("#Post2").val(post.substr(3).replace("-", ""));
                    $("#PostDelivery[type='hidden']").val(post);
                }

                $("#CodeDelivery").val(dataCodeCst);
                $("#NameDelivery").val(dataName);
                $("#AddressDelivery").val($(this).data("address"));
                $("#searchCustomerDialog").remove();

                return false;
            }
        }
    },

    events: {
        isValidSumit: function () {
            return CommonSettings.events.isValidSubmit();
        },

        getCustomer: function () {
            var data = $("#CodeCst").val();

            CommonSettings.events.clearValueFromDisabledInput('CustomerName');
            CommonSettings.events.clearValueFromDisabledInput('NameDelivery');
            $("#CodeDelivery").val('');
            $('span[data-valmsg-for="CodeCst"]').text('');
            $('span[data-valmsg-for="CodeDelivery"]').text('');
            CommonSettings.events.resetErrorArray('CodeCst');
            CommonSettings.events.resetErrorArray('CodeDelivery');

            if (data == '' || data == null) {
                return;
            }

            if (!CommonSettings.events.isValidHalfSize(data)) {
                $('span[data-valmsg-for="CodeCst"]').text(CommonSettings.errorMessages.ErrorMessageGetCustomer);
                return CommonSettings.events.addErrorArray('CodeCst');
            }
            CommonSettings.events.showProcessingOverlay();
            $.ajax({
                url: "/OrderHistory/CheckCustomer",
                type: "GET",
                dataType: "json",
                data: {
                    codeCst: data
                },
                success: function (result) {
                    if (result.Status) {
                        CommonSettings.events.setValueToDisabledInput('CustomerName', result.Result.Name);
                        $("#CodeDelivery").val(result.Result.CodeCst);
                        CommonSettings.events.setValueToDisabledInput('NameDelivery', result.Result.Name);
                    } else {
                        CommonSettings.events.addErrorArray('CodeCst');
                        $('span[data-valmsg-for="CodeCst"]').text(result.ErrorMessage);
                    }
                    CommonSettings.events.hideProcessingOverlay();
                },
                error: function (request, status, error) {
                    CommonSettings.events.addErrorArray('CodeCst');
                    $('span[data-valmsg-for="CodeCst"]').text(error);
                    CommonSettings.events.hideProcessingOverlay();
                }
            });
        },

        openDialogCustomer: function (event) {
            event.preventDefault();

            var url = $(this).attr('href');
            CommonSettings.events.showProcessingOverlay();
            $.ajax({
                type: 'GET',
                url: url,
                success: function (html) {
                    $('<div id="searchCustomerDialog" class="searchDialog"></div>').appendTo('body').html(html).dialog({
                        modal: true, title: '得意先検索', zIndex: 10020, autoOpen: true, width: 'auto', resizable: false,
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

                    OrderHistoryController.model.SearchCustomerURL = url;
                    OrderHistoryController.SearchCustomer.init();
                    CommonSettings.events.hideProcessingOverlay();
                },
                error: function () {
                    CommonSettings.events.hideProcessingOverlay();
                }
            });

            return false;
        }
    }
}