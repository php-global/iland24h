
var OrderController = OrderController || {};

OrderController = {
    model: {
        SearchCustomerURL: null,
        SearchDeliveryURL: null,
        CanEdit: true
    },
    init: function () {
        $(".date").datepicker(CommonSettings.model.datepickerOptions)
            .on("clearDate", function (e) {
                $('span[data-valmsg-for="DatePlanShipment"]').text('');
                CommonSettings.events.resetErrorArray('DatePlanShipment');
            });

        OrderController.events.loadAllCategories();

        $("select[data-name='CategoriesId']").on("change", OrderController.events.onChangeCategoriesId);
        $("select[data-name='CountId']").on("change", OrderController.events.onChangeCountId);
        $("select[data-name='SizeId']").on("change", OrderController.events.onChangeSizeId);
        $("select[data-name='ItemId']").on("change", OrderController.events.onChangeItemId);

        $(".buttonClearOrderRow").on("click", OrderController.events.clearOrderRow);
        $("#btnAdd10OrderRows").on("click", OrderController.events.add10OrderRows);
        $("input[data-name='BoxQuantity']").on("change", OrderController.events.onChangeBoxQuantityAndQuantity);
        $("input[data-name='Quantity']").on("change", OrderController.events.onChangeBoxQuantityAndQuantity);

        $("#btnSearchCustomer").on("click", OrderController.events.openDialogCustomer);
        $("#btnSearchDelivery").on("click", OrderController.events.openDialogCustomer);

        $("#CodeCst").on('change', OrderController.events.getCustomer);
        $("#CodeDelivery").on('change', OrderController.events.getDelivery);

        $("#DatePlanShipment").on("change", OrderController.events.checkValidDatePlanShip);

        OrderController.events.disableFormEditOrder();

        $('#form-edit-order').on('submit', OrderController.events.onSubmitForm);
    },
    events: {
        openDialogCustomer: function (event) {
            event.preventDefault();

            var url = $(this).attr('href');
            var btnSelect = $(this).attr('id');

            CommonSettings.events.showProcessingOverlay();
            $.ajax({
                type: 'GET',
                url: url,
                data: { codeCst: $("#CodeCst").val() },
                success: function (html) {
                    $('<div id="searchCustomerDialog" class="searchDialog"></div>').appendTo('body').html(html).dialog({
                        modal: true, title: '納入先検索', zIndex: 10020, autoOpen: true, width: 'auto', resizable: false,
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

                    OrderController.model.SearchCustomerURL = url;
                    OrderController.SearchCustomer.init();
                    OrderController.SearchCustomer.model.btnSelect = btnSelect;

                    CommonSettings.events.hideProcessingOverlay();
                }
            });

            return false;
        },

        loadAllCategories: function () {
            CommonSettings.events.showProcessingOverlay();

            $.ajax({
                type: 'POST',
                dataType: 'JSON',
                url: '/Admin/Order/GetAllCategories',
                success: function (data) {
                    if (data.Status) {
                        var ddlCategories = $("select[data-name='CategoriesId']");
                        ddlCategories.each(function () {
                            var ddlCategory = $(this);
                            ddlCategory.empty().append('<option value=""></option>');

                            $.each(data.Result, function (i, categories) {
                                ddlCategory.append('<option data-countFlg=' + categories.CountFlg + ' data-sizeFlg=' + categories.SizeFlg + ' value="' + categories.CategoriesId + '">' + categories.Name + '</option>');
                            });
                        });

                        // Load for editing
                        if ($("#NoWebOrder").val() != "") {
                            OrderController.events.loadOrderDetail($("#NoWebOrder").val());
                        }

                    }
                    CommonSettings.events.hideProcessingOverlay();
                },
                error: function (result) {
                    CommonSettings.events.hideProcessingOverlay();
                }
            });

            return false;
        },

        loadOrderDetail: function (noWebOrder) {
            $.ajax({
                type: 'POST',
                dataType: 'JSON',
                url: '/Admin/Order/GetOrderDetail',
                data: { noWebOrder: noWebOrder },
                success: function (data) {
                    if (data.Status) {
                        var count = 0;
                        $.each(data.Result, function (i, item) {

                            var orderDetail = {
                                OrderId: item.OrderId,
                                CountId: item.CountId,
                                SizeId: item.SizeId,
                                ItemId: item.ItemId,
                                BoxQuantity: item.BoxQuantity,
                                Quantity: item.Quantity,
                                PriceSale: item.PriceSale
                            };

                            var ddlCategories = $("select[data-name='CategoriesId'][data-id='" + count + "']");
                            ddlCategories.val(item.CategoriesId).trigger('change', [orderDetail]);
                            $("input[data-name='OrderId'][data-id='" + count + "']").val(item.OrderId);

                            count++;
                        });
                    }
                },
                error: function (result) {
                }
            });

            return false;
        },

        onChangeCategoriesId: function (event, orderDetail) {
            event.preventDefault();

            var categoriesId = $(this).val();
            var dataId = $(this).attr("data-id");

            var ddlCount = $("select[data-name='CountId'][data-id='" + dataId + "']");
            var ddlSize = $("select[data-name='SizeId'][data-id='" + dataId + "']");
            var ddlItem = $("select[data-name='ItemId'][data-id='" + dataId + "']");

            // Reset
            ddlCount.empty().append('<option value=""></option>').attr('disabled', 'disabled');
            ddlSize.empty().append('<option value=""></option>').attr('disabled', 'disabled');
            ddlItem.empty().append('<option value=""></option>').attr('disabled', 'disabled');

            // Update categories name
            $("input[data-name='CategoriesName'][data-id='" + dataId + "']").val($(this).find('option:selected').text());

            if (categoriesId != "") {
                var countFlg = $("select[data-name='CategoriesId'][data-id='" + dataId + "'] option:selected").attr("data-countFlg");
                var sizeFlg = $("select[data-name='CategoriesId'][data-id='" + dataId + "'] option:selected").attr("data-sizeFlg");

                // CountFlg - SizeFlg
                if (countFlg == 0 && sizeFlg == 0) { // 0 - 0
                    OrderController.events.loadItemsByCategoriesIdAndCountIdAndSizeId(dataId, orderDetail);
                }
                else if (countFlg == 1 && sizeFlg == 0) { // 1 - 0
                    OrderController.events.loadCountsByCategoriesId(dataId, orderDetail);
                }
                else if (countFlg == 0 && sizeFlg == 1) { // 0 - 1
                    OrderController.events.loadSizesByCategoriesIdAndCountId(dataId, orderDetail);
                }
                else { // 1 - 1
                    OrderController.events.loadCountsByCategoriesId(dataId, orderDetail);
                }
            }

            // Reset Item information
            OrderController.events.resetItemInformation(dataId);
            OrderController.events.enableEditableQuantity(dataId, false);

            return false;
        },

        loadCountsByCategoriesId: function (dataId, orderDetail) {
            var categoriesId = $("select[data-name='CategoriesId'][data-id='" + dataId + "']").val();
            var ddlCount = $("select[data-name='CountId'][data-id='" + dataId + "']");
            ddlCount.empty().append('<option value=""></option>').attr('disabled', 'disabled');

            if (categoriesId != "") {
                if (orderDetail == undefined)
                    CommonSettings.events.showProcessingOverlay();

                $.ajax({
                    type: 'POST',
                    dataType: 'JSON',
                    url: '/Admin/Order/LoadCountsByCategoriesId',
                    data: { categoriesId: categoriesId },
                    success: function (data) {
                        if (OrderController.model.CanEdit)
                            ddlCount.removeAttr('disabled');

                        $.each(data.Result, function (i, count) {
                            ddlCount.append('<option value="' + count.CountId + '">' + count.Name + '</option>');
                        });

                        if (orderDetail != undefined) {
                            ddlCount.val(orderDetail.CountId).trigger('change', [orderDetail]);
                        } else
                            CommonSettings.events.hideProcessingOverlay();
                    },
                    error: function (result) {
                        if (orderDetail == undefined)
                            CommonSettings.events.hideProcessingOverlay();
                    }
                });
            }

            return false;
        },

        onChangeCountId: function (event, orderDetail) {
            event.preventDefault();

            var countId = $(this).val();
            var dataId = $(this).attr("data-id");
            var categories = $("select[data-name='CategoriesId'][data-id='" + dataId + "']");

            var countFlg = $("select[data-name='CategoriesId'][data-id='" + dataId + "'] option:selected").attr("data-countFlg");
            var sizeFlg = $("select[data-name='CategoriesId'][data-id='" + dataId + "'] option:selected").attr("data-sizeFlg");

            // Update count name
            $("input[data-name='CountName'][data-id='" + dataId + "']").val($(this).find('option:selected').text());

            if (countFlg == 1 && sizeFlg == 0) {
                // Load Items
                OrderController.events.loadItemsByCategoriesIdAndCountIdAndSizeId(dataId, orderDetail);

            } else if (countFlg == 1 && sizeFlg == 1) {
                // Load Sizes
                OrderController.events.loadSizesByCategoriesIdAndCountId(dataId, orderDetail);
            }

            // Reset Item information
            OrderController.events.resetItemInformation(dataId);
            OrderController.events.enableEditableQuantity(dataId, false);

            return false;
        },

        loadSizesByCategoriesIdAndCountId: function (dataId, orderDetail) {
            var categoriesId = $("select[data-name='CategoriesId'][data-id='" + dataId + "']").val();
            var countId = $("select[data-name='CountId'][data-id='" + dataId + "']").val();

            // Reset
            var ddlSize = $("select[data-name='SizeId'][data-id='" + dataId + "']");
            ddlSize.empty().append('<option value=""></option>').attr('disabled', 'disabled');

            if (categoriesId != "") {
                if (orderDetail == undefined)
                    CommonSettings.events.showProcessingOverlay();

                $.ajax({
                    type: 'POST',
                    dataType: 'JSON',
                    url: '/Admin/Order/LoadSizesByCategoriesIdAndCountId',
                    data: { categoriesId: categoriesId, countId: countId == "" ? 0 : countId },
                    success: function (data) {
                        if (OrderController.model.CanEdit)
                            ddlSize.removeAttr('disabled');

                        $.each(data.Result, function (i, size) {
                            ddlSize.append('<option value="' + size.SizeId + '">' + size.Name + '</option>');
                        });

                        if (orderDetail != undefined) {
                            ddlSize.val(orderDetail.SizeId).trigger('change', [orderDetail]);
                        }
                        else
                            CommonSettings.events.hideProcessingOverlay();
                    },
                    error: function (result) {
                        if (orderDetail == undefined)
                            CommonSettings.events.hideProcessingOverlay();
                    }
                });
            }

            return false;
        },

        onChangeSizeId: function (event, orderDetail) {
            event.preventDefault();

            var sizeId = $(this).val();
            var dataId = $(this).attr("data-id");

            // Update size name
            $("input[data-name='SizeName'][data-id='" + dataId + "']").val($(this).find('option:selected').text());

            // Load Items
            OrderController.events.loadItemsByCategoriesIdAndCountIdAndSizeId(dataId, orderDetail);

            // Reset Item information
            OrderController.events.resetItemInformation(dataId);
            OrderController.events.enableEditableQuantity(dataId, false);

            return false;
        },

        loadItemsByCategoriesIdAndCountIdAndSizeId: function (dataId, orderDetail) {
            var categoriesId = $("select[data-name='CategoriesId'][data-id='" + dataId + "']").val();
            var countId = $("select[data-name='CountId'][data-id='" + dataId + "']").val();
            var sizeId = $("select[data-name='SizeId'][data-id='" + dataId + "']").val();

            // Reset
            var ddlItem = $("select[data-name='ItemId'][data-id='" + dataId + "']");
            ddlItem.empty().append('<option value=""></option>').attr('disabled', 'disabled');

            if (categoriesId != "") {
                if (orderDetail == undefined)
                    CommonSettings.events.showProcessingOverlay();

                $.ajax({
                    type: 'POST',
                    dataType: 'JSON',
                    url: '/Admin/Order/LoadItemsByCategoriesIdAndCountIdAndSizeId',
                    data: { categoriesId: categoriesId, countId: countId == "" ? 0 : countId, sizeId: sizeId == "" ? 0 : sizeId },
                    success: function (data) {
                        if (OrderController.model.CanEdit)
                            ddlItem.removeAttr('disabled');

                        $.each(data.Result, function (i, item) {
                            ddlItem.append('<option value="' + item.CodeItem + '">' + item.SName + '</option>');
                        });

                        if (orderDetail != undefined) {
                            ddlItem.val(orderDetail.ItemId).trigger('change', [orderDetail]);
                        }
                        else
                            CommonSettings.events.hideProcessingOverlay();
                    },
                    error: function (result) {
                        if (orderDetail == undefined)
                            CommonSettings.events.hideProcessingOverlay();
                    }
                });
            }

            return false;
        },

        onChangeItemId: function (event, orderDetail) {
            event.preventDefault();

            var itemId = $(this).val();
            var dataId = $(this).attr("data-id");

            // Reset
            OrderController.events.resetItemInformation(dataId);
            OrderController.events.enableEditableQuantity(dataId, false);

            // Update item name
            $("input[data-name='ItemName'][data-id='" + dataId + "']").val($(this).find('option:selected').text());

            if (itemId != "") {
                $.ajax({
                    type: 'POST',
                    dataType: 'JSON',
                    url: '/Admin/Order/GetItem',
                    data: { id: itemId, codeCst: $("#CodeCst").val() },
                    success: function (data) {
                        if (data.Status) {
                            if (orderDetail != undefined) {
                                $("input[data-name='BoxQuantity'][data-id='" + dataId + "']").val(CommonSettings.events.formatDigits(orderDetail.BoxQuantity));
                                $("input[data-name='Quantity'][data-id='" + dataId + "']").val(CommonSettings.events.formatDigits(orderDetail.Quantity));
                                $("input[data-name='PriceSale'][data-id='" + dataId + "']").val(CommonSettings.events.formatDigits(orderDetail.PriceSale));

                                // Update price
                                $("input[type='text'][data-name='Price'][data-id='" + dataId + "']").val(CommonSettings.events.formatDigits(orderDetail.BoxQuantity * orderDetail.PriceSale));
                                $("input[type='hidden'][data-name='Price'][data-id='" + dataId + "']").val(CommonSettings.events.formatDigits(orderDetail.BoxQuantity * orderDetail.PriceSale));
                            } else {
                                $("input[data-name='BoxQuantity'][data-id='" + dataId + "']").val('0');
                                $("input[data-name='Quantity'][data-id='" + dataId + "']").val('0');
                                $("input[data-name='Price'][data-id='" + dataId + "']").val('0');

                                $("input[data-name='InnerQuantity'][data-id='" + dataId + "']").val(CommonSettings.events.formatDigits(data.Result.InnerQuantity));
                                $("input[data-name='PriceSale'][data-id='" + dataId + "']").val(CommonSettings.events.formatDigits(data.Result.Price));
                            }

                            $("input[data-name='InnerQuantity'][data-id='" + dataId + "']").val(CommonSettings.events.formatDigits(data.Result.InnerQuantity));
                            $(".UnitName2[data-id='" + dataId + "']").text(data.Result.UnitName2).val(data.Result.UnitName2);
                            $(".UnitName1[data-id='" + dataId + "']").text(data.Result.UnitName1).val(data.Result.UnitName1);

                            if (!OrderController.model.CanEdit) {
                                OrderController.events.disableFormEditOrder();
                            }
                            else {
                                OrderController.events.enableEditableQuantity(dataId, true, data.Result.BoxLowerLimit, data.Result.BoxUpperLimit,
                                    data.Result.QuantityLowerLimit, data.Result.QuantityUpperLimit);
                            }

                            // Update total price
                            OrderController.events.updateTotalPrice();
                        }
                    },
                    error: function (result) {
                    }
                });
            }

            return false;
        },

        disableFormEditOrder: function () {
            if ($("#CanEdit").val() == "False") {
                $("#form-edit-order input").attr("disabled", "disabled");
                $("#form-edit-order select").attr("disabled", "disabled");
                $("#form-edit-order button").attr("disabled", "disabled");
                $("#form-edit-order a").each(function (i, element) {
                    $(element).css("pointer-events", "none");
                    $(element).off("click");
                    $(element).removeAttr("href");
                });
                OrderController.model.CanEdit = false;
            }
        },

        enableEditableQuantity: function (dataId, enable, boxLowerLimit, boxUpperLimit, quantityLowerLimit, quantityUpperLimit) {
            var txtBoxQuantity = $("input[data-name='BoxQuantity'][data-id='" + dataId + "']");
            var txtQuantity = $("input[data-name='Quantity'][data-id='" + dataId + "']");

            if (enable && OrderController.model.CanEdit) {
                txtBoxQuantity.removeAttr('disabled').removeAttr('data-min').removeAttr('data-max');
                txtQuantity.removeAttr('disabled').removeAttr('data-min').removeAttr('data-max');

                if (!(boxLowerLimit == 0 && boxUpperLimit == 0)) {
                    txtBoxQuantity.attr("data-min", boxLowerLimit).attr("data-max", boxUpperLimit);
                }
                if (!(quantityLowerLimit == 0 && quantityUpperLimit == 0)) {
                    txtQuantity.attr("data-min", quantityLowerLimit).attr("data-max", quantityUpperLimit);
                }

            } else {
                txtBoxQuantity.attr('disabled', 'disabled');
                txtQuantity.attr('disabled', 'disabled');
            }
        },

        resetItemInformation: function (dataId) {
            $("input[type!='hidden'][data-id='" + dataId + "']").val('');
            $(".UnitName[data-id='" + dataId + "']").text('').val('');
            $("p[data-id='" + dataId + "'][data-valmsg-for='BoxQuantity']").empty();
            $("p[data-id='" + dataId + "'][data-valmsg-for='Quantity']").empty();
        },

        onChangeBoxQuantityAndQuantity: function (event) {
            event.preventDefault();

            var dataId = $(this).attr("data-id");
            var dataName = $(this).attr("data-name");

            var txtBoxQuantity = $("input[type='text'][data-name='BoxQuantity'][data-id='" + dataId + "']");
            var txtQuantity = $("input[type='text'][data-name='Quantity'][data-id='" + dataId + "']");
            var boxQuantity = txtBoxQuantity.val().replace(",", "");
            var quantity = txtQuantity.val().replace(",", "");

            var errorBoxQuantity = $("p[data-id='" + dataId + "'][data-valmsg-for='BoxQuantity']");
            var errorQuantity = $("p[data-id='" + dataId + "'][data-valmsg-for='Quantity']");

            var currentItemValue = $("select[data-name='ItemId'][data-id='" + dataId + "']").val();

            var boxQuantityTotal = 0;
            var quantityTotal = 0;
            $("select[data-name='ItemId']").each(function (i, element) {
                if ($(this).val() == currentItemValue) {
                    boxQuantityTotal += parseFloat($("input[type='text'][data-name='BoxQuantity'][data-id='" + $(this).attr("data-id") + "']").val().replace(",", ""));
                    quantityTotal += parseFloat($("input[type='text'][data-name='Quantity'][data-id='" + $(this).attr("data-id") + "']").val().replace(",", ""));
                }
            });

            // Box Quantity
            if (dataName == "BoxQuantity") {
                errorBoxQuantity.text('');
                var dataMin = txtBoxQuantity.attr("data-min");
                var dataMax = txtBoxQuantity.attr("data-max");

                if (boxQuantity == '') {
                    errorBoxQuantity.append(CommonSettings.errorMessages.OrderBoxQuantityRequired + "<br/>");
                    CommonSettings.events.addErrorArray('BoxQuantity[' + dataId + ']');
                }
                else if (!/^\d+$/.test(boxQuantity)) {
                    errorBoxQuantity.append(CommonSettings.errorMessages.OrderBoxQuantityHalfSize + "<br/>");
                    CommonSettings.events.addErrorArray('BoxQuantity[' + dataId + ']');
                } else if (dataMin != undefined && dataMax != undefined && (parseFloat(boxQuantityTotal) < parseFloat(dataMin) || parseFloat(boxQuantityTotal) > parseFloat(dataMax))) {
                    var errorText = CommonSettings.errorMessages.OrderBoxQuantityRange.replace("〇〇", CommonSettings.events.formatDigits(dataMin)).replace("××", CommonSettings.events.formatDigits(dataMax));
                    errorBoxQuantity.append(errorText + "<br/>");
                    CommonSettings.events.addErrorArray('BoxQuantity[' + dataId + ']');
                } else {
                    CommonSettings.events.resetErrorArray('BoxQuantity[' + dataId + ']');

                    boxQuantity = parseFloat(boxQuantity);
                    var innerQuantity = parseFloat($("input[type='text'][data-name='InnerQuantity'][data-id='" + dataId + "']").val().replace(",", ""));
                    var priceSale = parseFloat($("input[type='text'][data-name='PriceSale'][data-id='" + dataId + "']").val().replace(",", ""));

                    // Update quantity
                    quantity = boxQuantity * innerQuantity;
                    txtQuantity.val(CommonSettings.events.formatDigits(quantity));

                    var dataMinQuantity = txtQuantity.attr("data-min");
                    var dataMaxQuantity = txtQuantity.attr("data-max");

                    if (dataMinQuantity != undefined && dataMaxQuantity != undefined && (quantity < parseFloat(dataMinQuantity) || quantity > parseFloat(dataMaxQuantity))) {
                        var errorText = CommonSettings.errorMessages.OrderQuantityRange.replace("〇〇", CommonSettings.events.formatDigits(dataMinQuantity)).replace("××", CommonSettings.events.formatDigits(dataMaxQuantity));
                        errorQuantity.append(errorText + "<br/>");
                        CommonSettings.events.addErrorArray('Quantity[' + dataId + ']');
                    } else {
                        errorQuantity.text('');
                        CommonSettings.events.resetErrorArray('Quantity[' + dataId + ']');

                        // Update price
                        $("input[type='text'][data-name='Price'][data-id='" + dataId + "']").val(CommonSettings.events.formatDigits(boxQuantity * priceSale));
                        $("input[type='hidden'][data-name='Price'][data-id='" + dataId + "']").val(CommonSettings.events.formatDigits(boxQuantity * priceSale));
                        OrderController.events.updateTotalPrice();
                    }
                }
            } else if (dataName == "Quantity") { // Quantity
                errorQuantity.text('');
                var dataMin = txtQuantity.attr("data-min");
                var dataMax = txtQuantity.attr("data-max");

                if (quantity == '') {
                    errorQuantity.append(CommonSettings.errorMessages.OrderQuantityRequired + "<br/>");
                    CommonSettings.events.addErrorArray('Quantity[' + dataId + ']');
                }
                else if (!/^\d+$/.test(quantity)) {
                    errorQuantity.append(CommonSettings.errorMessages.OrderQuantityHalfSize + "<br/>");
                    CommonSettings.events.addErrorArray('Quantity[' + dataId + ']');
                } else if (dataMin != undefined && dataMax != undefined && (parseFloat(quantityTotal) < parseFloat(dataMin) || parseFloat(quantityTotal) > parseFloat(dataMax))) {
                    var errorText = CommonSettings.errorMessages.OrderQuantityRange.replace("〇〇", CommonSettings.events.formatDigits(dataMin)).replace("××", CommonSettings.events.formatDigits(dataMax));
                    errorQuantity.append(errorText + "<br/>");
                    CommonSettings.events.addErrorArray('Quantity[' + dataId + ']');
                } else {
                    quantity = parseFloat(quantity);
                    var innerQuantity = parseFloat($("input[type='text'][data-name='InnerQuantity'][data-id='" + dataId + "']").val().replace(",", ""));

                    if (quantity % innerQuantity == 0) {
                        CommonSettings.events.resetErrorArray('Quantity[' + dataId + ']');

                        var priceSale = parseFloat($("input[type='text'][data-name='PriceSale'][data-id='" + dataId + "']").val().replace(",", ""));
                        var boxQuantity = quantity / innerQuantity;
                        txtBoxQuantity.val(CommonSettings.events.formatDigits(boxQuantity));

                        var dataMinBoxQuantity = txtBoxQuantity.attr("data-min");
                        var dataMaxBoxQuantity = txtBoxQuantity.attr("data-max");

                        if (dataMinBoxQuantity != undefined && dataMaxBoxQuantity != undefined && (boxQuantity < parseFloat(dataMinBoxQuantity) || boxQuantity > parseFloat(dataMaxBoxQuantity))) {
                            var errorText = CommonSettings.errorMessages.OrderBoxQuantityRange.replace("〇〇", CommonSettings.events.formatDigits(dataMinBoxQuantity)).replace("××", CommonSettings.events.formatDigits(dataMaxBoxQuantity));
                            errorBoxQuantity.append(errorText + "<br/>");
                            CommonSettings.events.addErrorArray('BoxQuantity[' + dataId + ']');
                        } else {
                            errorBoxQuantity.text('');
                            CommonSettings.events.resetErrorArray('BoxQuantity[' + dataId + ']');

                            // Update price
                            $("input[type='text'][data-name='Price'][data-id='" + dataId + "']").val(CommonSettings.events.formatDigits(boxQuantity * priceSale));
                            $("input[type='hidden'][data-name='Price'][data-id='" + dataId + "']").val(CommonSettings.events.formatDigits(boxQuantity * priceSale));
                            OrderController.events.updateTotalPrice();
                        }
                    } else {
                        errorQuantity.append(CommonSettings.errorMessages.OrderQuantityCannotDivide + "<br/>");
                        CommonSettings.events.addErrorArray('Quantity[' + dataId + ']');
                    }
                }
            }

            return false;
        },

        onChangeBoxQuantity: function (event) {
            event.preventDefault();
            var dataId = $(this).attr("data-id");
            var dataName = $(this).attr("data-name");

            var txtBoxQuantity = $("input[type='text'][data-name='BoxQuantity'][data-id='" + dataId + "']");
            var txtQuantity = $("input[type='text'][data-name='Quantity'][data-id='" + dataId + "']");

            var error = $("p[data-id='" + dataId + "'][data-valmsg-for='BoxQuantity']");
            error.text('');
            var dataMin = $(this).attr("data-min");
            var dataMax = $(this).attr("data-max");

            if (value == '') {
                if (error.text().indexOf(CommonSettings.errorMessages.OrderBoxQuantityRequired) == -1)
                    error.append(CommonSettings.errorMessages.OrderBoxQuantityRequired + "<br/>");
                CommonSettings.events.addErrorArray('BoxQuantity[' + dataId + ']');
            }
            else if (!/^\d+$/.test(value)) {
                if (error.text().indexOf(CommonSettings.errorMessages.OrderBoxQuantityHalfSize) == -1)
                    error.append(CommonSettings.errorMessages.OrderBoxQuantityHalfSize + "<br/>");
                CommonSettings.events.addErrorArray('BoxQuantity[' + dataId + ']');
            } else if (dataMin != undefined && dataMax != undefined && (parseFloat(value) < parseFloat(dataMin) || parseFloat(value) > parseFloat(dataMax))) {
                var errorText = CommonSettings.errorMessages.OrderBoxQuantityRange.replace("〇〇", CommonSettings.events.formatDigits(dataMin)).replace("××", CommonSettings.events.formatDigits(dataMax));
                if (error.text().indexOf(errorText) == -1)
                    error.append(errorText + "<br/>");
                CommonSettings.events.addErrorArray('BoxQuantity[' + dataId + ']');
            }
            else {
                // Valid box quantity
                error.text('');
                CommonSettings.events.resetErrorArray('BoxQuantity[' + dataId + ']');

                var boxQuantity = parseFloat(value);
                var innerQuantity = parseFloat($("input[type='text'][data-name='InnerQuantity'][data-id='" + dataId + "']").val().replace(",", ""));
                var priceSale = parseFloat($("input[type='text'][data-name='PriceSale'][data-id='" + dataId + "']").val().replace(",", ""));

                // Update quantity
                var quantity = boxQuantity * innerQuantity;
                var txtQuantity = $("input[type='text'][data-name='Quantity'][data-id='" + dataId + "']");
                txtQuantity.val(CommonSettings.events.formatDigits(quantity));

                var dataMinQuantity = txtQuantity.attr("data-min");
                var dataMaxQuantity = txtQuantity.attr("data-max");

                if (dataMinQuantity != undefined && dataMaxQuantity != undefined && (quantity < parseFloat(dataMinQuantity) || quantity > parseFloat(dataMaxQuantity))) {
                    var errorText = CommonSettings.errorMessages.OrderQuantityRange.replace("〇〇", CommonSettings.events.formatDigits(dataMinQuantity)).replace("××", CommonSettings.events.formatDigits(dataMaxQuantity));
                    if (error.text().indexOf(errorText) == -1)
                        error.append(errorText + "<br/>");
                    CommonSettings.events.addErrorArray('Quantity[' + dataId + ']');
                } else {
                    error.text('');
                    CommonSettings.events.resetErrorArray('Quantity[' + dataId + ']');

                    // Update price
                    $("input[type='text'][data-name='Price'][data-id='" + dataId + "']").val(CommonSettings.events.formatDigits(boxQuantity * priceSale));
                    $("input[type='hidden'][data-name='Price'][data-id='" + dataId + "']").val(CommonSettings.events.formatDigits(boxQuantity * priceSale));
                }
            }

            return false;
        },

        onChangeQuantity: function (event) {
            event.preventDefault();
            var dataId = $(this).attr("data-id");
            var value = $(this).val().replace(",", "");
            var dataName = $(this).attr("data-name");

            var error = $("p[data-id='" + dataId + "'][data-valmsg-for='BoxQuantity']");
            error.text('');
            var dataMin = $(this).attr("data-min");
            var dataMax = $(this).attr("data-max");

            if (value == '') {
                if (error.text().indexOf(CommonSettings.errorMessages.OrderQuantityRequired) == -1)
                    error.append(CommonSettings.errorMessages.OrderQuantityRequired + "<br/>");
                CommonSettings.events.addErrorArray('Quantity[' + dataId + ']');
            }
            else if (!/^\d+$/.test(value)) {
                if (error.text().indexOf(CommonSettings.errorMessages.OrderQuantityHalfSize) == -1)
                    error.append(CommonSettings.errorMessages.OrderQuantityHalfSize + "<br/>");
                CommonSettings.events.addErrorArray('Quantity[' + dataId + ']');
            } else if (dataMin != undefined && dataMax != undefined && (parseFloat(value) < parseFloat(dataMin) || parseFloat(value) > parseFloat(dataMax))) {
                var errorText = CommonSettings.errorMessages.OrderQuantityRange.replace("〇〇", CommonSettings.events.formatDigits(dataMin)).replace("××", CommonSettings.events.formatDigits(dataMax));
                if (error.text().indexOf(errorText) == -1)
                    error.append(errorText + "<br/>");
                CommonSettings.events.addErrorArray('Quantity[' + dataId + ']');
            }
            else {
                var quantity = parseFloat(value);
                var innerQuantity = parseFloat($("input[type='text'][data-name='InnerQuantity'][data-id='" + dataId + "']").val().replace(",", ""));

                if (quantity % innerQuantity == 0) {
                    // Valid quantity
                    error.text('');
                    CommonSettings.events.resetErrorArray('Quantity[' + dataId + ']');

                    var priceSale = parseFloat($("input[type='text'][data-name='PriceSale'][data-id='" + dataId + "']").val().replace(",", ""));

                    // Update box quantity
                    var boxQuantity = quantity / innerQuantity;
                    var txtBoxQuantity = $("input[data-name='BoxQuantity'][data-id='" + dataId + "']");
                    txtBoxQuantity.val(CommonSettings.events.formatDigits(boxQuantity));

                    var dataMinBoxQuantity = txtBoxQuantity.attr("data-min");
                    var dataMaxBoxQuantity = txtBoxQuantity.attr("data-max");

                    if (dataMinBoxQuantity != undefined && dataMaxBoxQuantity != undefined && (boxQuantity < parseFloat(dataMinBoxQuantity) || boxQuantity > parseFloat(dataMaxBoxQuantity))) {
                        var errorText = CommonSettings.errorMessages.OrderBoxQuantityRange.replace("〇〇", CommonSettings.events.formatDigits(dataMinBoxQuantity)).replace("××", CommonSettings.events.formatDigits(dataMaxBoxQuantity));
                        if (error.text().indexOf(errorText) == -1)
                            error.append(errorText + "<br/>");
                        CommonSettings.events.addErrorArray('BoxQuantity[' + dataId + ']');
                    } else {
                        error.text('');
                        CommonSettings.events.resetErrorArray('BoxQuantity[' + dataId + ']');

                        // Update price
                        $("input[type='text'][data-name='Price'][data-id='" + dataId + "']").val(CommonSettings.events.formatDigits(boxQuantity * priceSale));
                        $("input[type='hidden'][data-name='Price'][data-id='" + dataId + "']").val(CommonSettings.events.formatDigits(boxQuantity * priceSale));
                    }
                } else {
                    if (error.text().indexOf(CommonSettings.errorMessages.OrderQuantityCannotDivide) == -1)
                        error.append(CommonSettings.errorMessages.OrderQuantityCannotDivide + "<br/>");
                    CommonSettings.events.addErrorArray('Quantity[' + dataId + ']');
                }
            }
            return false;
        },

        add10OrderRows: function (event) { // Removed
            event.preventDefault();

            var totalItems = $(".orderRow1").length;
            var lastOrderRow1 = $(".slideTBL").find("tr.orderRow1:last");
            var lastOrderRow2 = $(".slideTBL").find("tr.orderRow2:last");

            for (var i = totalItems + 9; i >= totalItems; i--) {
                var orderRow1Clone = $(lastOrderRow1).clone(true, true);
                var orderRow2Clone = $(lastOrderRow2).clone(true, true);

                orderRow1Clone.find('td').each(function () {
                    if ($(this).hasClass('c_no'))
                        $(this).text((i + 1).toString());

                    $(this).find("select[data-name='CategoriesId']").attr("data-id", i).attr("id", "orderDetailViewModel_" + i + "__CategoriesId").attr("name", "orderDetailViewModel[" + i + "].CategoriesId");
                    $(this).find("input[type='hidden'][data-name='CategoriesName']").attr("data-id", i).attr("id", "orderDetailViewModel_" + i + "__CategoriesName").attr("name", "orderDetailViewModel[" + i + "].CategoriesName").val(null);

                    $(this).find("select[data-name='CountId']").attr("data-id", i).attr("id", "orderDetailViewModel_" + i + "__CountId").attr("name", "orderDetailViewModel[" + i + "].CountId").empty();
                    $(this).find("input[type='hidden'][data-name='CountName']").attr("data-id", i).attr("id", "orderDetailViewModel_" + i + "__CountName").attr("name", "orderDetailViewModel[" + i + "].CountName").val(null);

                    $(this).find("select[data-name='SizeId']").attr("data-id", i).attr("id", "orderDetailViewModel_" + i + "__SizeId").attr("name", "orderDetailViewModel[" + i + "].SizeId").empty();
                    $(this).find("input[type='hidden'][data-name='SizeName']").attr("data-id", i).attr("id", "orderDetailViewModel_" + i + "__SizeName").attr("name", "orderDetailViewModel[" + i + "].SizeName").val(null);

                    $(this).find("input[type='text'][data-name='InnerQuantity']").attr("data-id", i).attr("id", "orderDetailViewModel_" + i + "__InnerQuantity").attr("name", "orderDetailViewModel[" + i + "].InnerQuantity").val(null);
                    $(this).find("input[type='hidden'][data-name='InnerQuantity']").attr("data-id", i).attr("id", "orderDetailViewModel_" + i + "__InnerQuantity").attr("name", "orderDetailViewModel[" + i + "].InnerQuantity").val(null);
                    $(this).find("span.UnitName2").attr("data-id", i).empty();
                    $(this).find("input.UnitName2[type='hidden']").attr("data-id", i).attr("id", "orderDetailViewModel_" + i + "__UnitName2").attr("name", "orderDetailViewModel[" + i + "].UnitName2").val(null);

                    $(this).find("input[type='text'][data-name='BoxQuantity']").attr("data-id", i).attr("id", "orderDetailViewModel_" + i + "__BoxQuantity").attr("name", "orderDetailViewModel[" + i + "].BoxQuantity").val(null);
                    $(this).find("span.UnitName1").attr("data-id", i).empty();
                    $(this).find("input.UnitName1[type='hidden']").attr("data-id", i).attr("id", "orderDetailViewModel_" + i + "__UnitName1").attr("name", "orderDetailViewModel[" + i + "].UnitName1").val(null);

                    $(this).find("input[type='text'][data-name='Quantity']").attr("data-id", i).attr("id", "orderDetailViewModel_" + i + "__Quantity").attr("name", "orderDetailViewModel[" + i + "].Quantity").val(null);

                    $(this).find("input[type='text'][data-name='PriceSale']").attr("data-id", i).attr("id", "orderDetailViewModel_" + i + "__PriceSale").attr("name", "orderDetailViewModel[" + i + "].PriceSale").val(null);
                    $(this).find("input[type='hidden'][data-name='PriceSale']").attr("data-id", i).attr("id", "orderDetailViewModel_" + i + "__PriceSale").attr("name", "orderDetailViewModel[" + i + "].PriceSale").val(null);
                    $(this).find("input[type='text'][data-name='Price']").attr("data-id", i).attr("id", "orderDetailViewModel_" + i + "__Price").attr("name", "orderDetailViewModel[" + i + "].Price").val(null);
                    $(this).find("input[type='hidden'][data-name='Price']").attr("data-id", i).attr("id", "orderDetailViewModel_" + i + "__Price").attr("name", "orderDetailViewModel[" + i + "].Price").val(null);

                    $(this).find("input").attr("data-id", i).val('');
                    $(this).find(".buttonClearOrderRow").attr("data-id", i);
                });

                orderRow2Clone.find('td').each(function () {
                    $(this).find("select[data-name='ItemId']").attr("data-id", i).attr("id", "orderDetailViewModel_" + i + "__ItemId").attr("name", "orderDetailViewModel[" + i + "].ItemId").empty();
                    $(this).find("input[type='hidden'][data-name='ItemName']").attr("data-id", i).attr("id", "orderDetailViewModel_" + i + "__ItemName").attr("name", "orderDetailViewModel[" + i + "].ItemName").val(null);
                    $(this).find("p[data-name='BoxQuantity'][data-valmsg-for='BoxQuantity']").attr("data-id", i).empty();
                    $(this).find("p[data-name='Quantity'][data-valmsg-for='Quantity']").attr("data-id", i).empty();
                });

                orderRow1Clone.insertAfter(lastOrderRow2);
                orderRow2Clone.insertAfter(orderRow1Clone);
            }

            // Max 50 lines
            if (totalItems + 10 >= 50) {
                $(this).css("display", "none");
            }

            return false;
        },

        clearOrderRow: function (event) {
            event.preventDefault();
            var dataId = $(this).data("id");

            var ddlCategories = $("select[data-name='CategoriesId'][data-id='" + dataId + "']");
            ddlCategories.val('').trigger('change');

            OrderController.events.resetItemInformation(dataId);
            OrderController.events.enableEditableQuantity(dataId, false);
            OrderController.events.updateTotalPrice();

            $("p[data-id='" + dataId + "'][data-valmsg-for='BoxQuantity']").text('');
            $("p[data-id='" + dataId + "'][data-valmsg-for='Quantity']").text('');
            CommonSettings.events.resetErrorArray('BoxQuantity[' + dataId + ']');
            CommonSettings.events.resetErrorArray('Quantity[' + dataId + ']');

            return false;
        },

        updateTotalPrice: function () {
            var totalPrice = 0;
            $("input[type='text'][data-name='Price']").each(function () {
                var value = $(this).val().replace(",", "");
                totalPrice += isNaN(parseFloat(value)) ? 0 : parseFloat(value);
            });
            $("#TotalPrice").val(CommonSettings.events.formatDigits(totalPrice));
        },

        // On Blur functions
        getAdmin: function (e) {
            var data = $("#StaffCode").val();

            CommonSettings.events.clearValueFromDisabledInput('AdminName');
            $('span[data-valmsg-for="StaffCode"]').text('');
            CommonSettings.events.resetErrorArray('StaffCode');

            if (data == '' || data == null) {
                return;
            }

            if (!CommonSettings.events.isValidHalfSize(data)) {
                $('span[data-valmsg-for="StaffCode"]').text(CommonSettings.errorMessages.ErrorMessageGetAdmin);
                return CommonSettings.events.addErrorArray('StaffCode');
            }

            $.ajax({
                url: "/Admin/OrderHistory/CheckAdmin",
                type: "GET",
                dataType: "json",
                data: {
                    staffCode: data
                },
                success: function (result) {
                    if (result.Status) {
                        CommonSettings.events.setValueToDisabledInput('AdminName', result.Result);
                    } else {
                        CommonSettings.events.addErrorArray('StaffCode');
                        $('span[data-valmsg-for="StaffCode"]').text(result.ErrorMessage);
                    }
                },
                error: function (request, status, error) {
                    CommonSettings.events.addErrorArray('StaffCode');
                    $('span[data-valmsg-for="StaffCode"]').text(error);
                }
            });
        },

        getCustomer: function () {
            var data = $("#CodeCst").val();

            CommonSettings.events.clearValueFromDisabledInput('CustomerName');
            CommonSettings.events.clearValueFromDisabledInput('NameDelivery');
            CommonSettings.events.clearValueFromDisabledInput('Post1');
            CommonSettings.events.clearValueFromDisabledInput('Post2');
            CommonSettings.events.clearValueFromDisabledInput('AddressDelivery');
            CommonSettings.events.clearValueFromDisabledInput('CodeDelivery');
            $('span[data-valmsg-for="CodeCst"]').text('');
            $('span[data-valmsg-for="CodeDelivery"]').text('');
            $("#PostDelivery[type='hidden']").val('');

            CommonSettings.events.resetErrorArray('CodeCst');
            CommonSettings.events.resetErrorArray('CodeDelivery');

            if (data == '' || data == null) {
                return;
            }

            if (!CommonSettings.events.isValidHalfSize(data)) {
                $('span[data-valmsg-for="CodeCst"]').text(CommonSettings.errorMessages.OrderGetCustomer);
                return CommonSettings.events.addErrorArray('CodeCst');
            }

            $.ajax({
                url: "/Admin/OrderHistory/CheckCustomer",
                type: "GET",
                dataType: "json",
                data: {
                    codeCst: data
                },
                success: function (result) {
                    if (result.Status) {
                        CommonSettings.events.setValueToDisabledInput('CustomerName', result.Result.Name);
                        CommonSettings.events.setValueToDisabledInput('CodeDelivery', result.Result.BillingCode);
                        CommonSettings.events.setValueToDisabledInput('NameDelivery', result.Result.BillingName);

                        var post = result.Result.Post;
                        if (post != undefined) {
                            CommonSettings.events.setValueToDisabledInput('Post1', post.substr(0, 3));
                            CommonSettings.events.setValueToDisabledInput('Post2', post.substr(3).replace("-", ""));
                            $("#PostDelivery[type='hidden']").val(post);
                        }
                        CommonSettings.events.setValueToDisabledInput('AddressDelivery', result.Result.Address);

                        // Reload items price
                        OrderController.events.onChangeCustomerCst();

                    } else {
                        CommonSettings.events.addErrorArray('CodeCst');
                        $('span[data-valmsg-for="CodeCst"]').text(result.ErrorMessage);
                    }
                },
                error: function (request, status, error) {
                    CommonSettings.events.addErrorArray('CodeCst');
                    $('span[data-valmsg-for="CodeCst"]').text(error);
                }
            });
        },

        getDelivery: function (e) {
            var codeDelivery = $("#CodeDelivery").val();

            CommonSettings.events.clearValueFromDisabledInput('NameDelivery');
            $('span[data-valmsg-for="CodeDelivery"]').text('');
            CommonSettings.events.resetErrorArray('CodeDelivery');

            if (codeDelivery == '' || codeDelivery == null) {
                return;
            }

            if (!CommonSettings.events.isValidHalfSize(codeDelivery)) {
                $('span[data-valmsg-for="CodeDelivery"]').text(CommonSettings.errorMessages.OrderGetCustomer);
                return CommonSettings.events.addErrorArray('CodeDelivery');
            }

            $.ajax({
                url: "/Admin/OrderHistory/CheckCustomer",
                type: "GET",
                dataType: "json",
                data: {
                    codeCst: codeDelivery,
                },
                success: function (result) {
                    if (result.Status) {
                        CommonSettings.events.setValueToDisabledInput('NameDelivery', result.Result.BillingName)
                    } else {
                        CommonSettings.events.addErrorArray('CodeDelivery');
                        $('span[data-valmsg-for="CodeDelivery"]').text(result.ErrorMessage);
                    }
                },
                error: function (request, status, error) {
                    CommonSettings.events.addErrorArray('CodeDelivery');
                    $('span[data-valmsg-for="CodeDelivery"]').text(error);
                }
            });
        },

        checkValidDatePlanShip: function (event) {
            event.preventDefault();
            $('span[data-valmsg-for="DatePlanShipment"]').text('');

            $.ajax({
                url: "/Admin/Order/CheckValidDatePlanShip",
                type: "POST",
                data: { datePlanShip: $(this).val() },
                success: function (result) {
                    if (result.Status) {
                        CommonSettings.events.resetErrorArray('DatePlanShipment');
                    } else {
                        $('span[data-valmsg-for="DatePlanShipment"]').text(result.ErrorMessage);
                        CommonSettings.events.addErrorArray('DatePlanShipment');
                    }
                },
                error: function (request, status, error) {
                    $('span[data-valmsg-for="DatePlanShipment"]').text(error);
                    CommonSettings.events.addErrorArray('DatePlanShipment');
                }
            });

            return false;
        },

        onSubmitForm: function (event) {
            event.preventDefault();

            if (CommonSettings.events.isValidSubmit()) {
                $("span[data-valmsg-for]").text('');

                $.ajax({
                    type: 'POST',
                    url: '/Admin/Order/Edit',
                    data: $(this).serialize(),
                    success: function (data) {
                        if (data.Status) {
                            location.href = data.Result;
                        } else {
                            $.each(data.Result, function (i, value) {
                                $("span[data-valmsg-for='" + i + "']").text(value);
                            });

                            $(window).scrollTop(0);
                        }
                    },
                    error: function (result) {
                    }
                });
            }
            else {
                $(window).scrollTop(0);
            }


            return false;
        },

        onChangeCustomerCst: function () {
            $("select[data-name='ItemId']").each(function (i, element) {
                var itemId = $(element).val();
                var dataId = $(element).data("id");

                if (itemId != '') {
                    $.ajax({
                        type: 'POST',
                        dataType: 'JSON',
                        url: '/Admin/Order/GetItem',
                        data: { id: itemId, codeCst: $("#CodeCst").val() },
                        success: function (data) {
                            if (data.Status) {
                                var boxQuantity = $("input[type='text'][data-name='BoxQuantity'][data-id='" + dataId + "']").val();

                                $("input[data-name='PriceSale'][data-id='" + dataId + "']").val(CommonSettings.events.formatDigits(data.Result.Price));
                                $("input[type='text'][data-name='Price'][data-id='" + dataId + "']").val(CommonSettings.events.formatDigits(boxQuantity * data.Result.Price));
                                $("input[type='hidden'][data-name='Price'][data-id='" + dataId + "']").val(CommonSettings.events.formatDigits(boxQuantity * data.Result.Price));
                                OrderController.events.updateTotalPrice();
                            }
                        },
                        error: function (result) {
                        }
                    });
                }
            });
        }
    },

    SearchCustomer: {
        model: {
            btnSelect: null
        },

        init: function () {
            $("#searchCustomerDialog .paginationCustom li a").on("click", OrderController.SearchCustomer.events.pagingSearchDialog);
            $("#searchCustomerDialog #btnSearch").on("click", OrderController.SearchCustomer.events.searchByKeyword);
            $("#searchCustomerDialog .btnSelectCustomer").on("click", OrderController.SearchCustomer.events.selectItem);
            $("#searchCustomerDialog .btnSelectBilling").on("click", OrderController.SearchCustomer.events.selectItem);
        },
        events: {
            pagingSearchDialog: function (event) {
                event.preventDefault();

                if ($(this).css('cursor') != "not-allowed") {
                    var page = $(this).attr('href') != undefined ? $(this).attr('href').split("page=")[1].split("&")[0] : '';

                    $.ajax({
                        type: 'GET',
                        url: OrderController.model.SearchCustomerURL,
                        data: { keyword: $("#searchCustomerDialog #keyword").val(), page: page },
                    }).done(function (html) {
                        $("#searchCustomerDialog").empty().html(html);
                        OrderController.SearchCustomer.init();
                    });
                }

                return false;
            },
            searchByKeyword: function (event) {
                event.preventDefault();

                $.ajax({
                    type: 'GET',
                    url: OrderController.model.SearchCustomerURL,
                    data: { keyword: $("#searchCustomerDialog #keyword").val() },
                }).done(function (html) {
                    $("#searchCustomerDialog").empty().html(html);
                    OrderController.SearchCustomer.init();
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

                if (OrderController.SearchCustomer.model.btnSelect == 'btnSearchCustomer') {
                    //set value
                    var dataCodeCst = $(this).data("codecst");
                    var dataName = $(this).data("name");
                    var dataBillCst = $(this).data("billcst");
                    var dataBillName = $(this).data("billname");

                    $("#CodeCst").val(dataCodeCst);
                    CommonSettings.events.setValueToDisabledInput('CustomerName', dataName);
                    CommonSettings.events.setValueToDisabledInput('CodeDelivery', dataBillCst);
                    CommonSettings.events.setValueToDisabledInput('NameDelivery', dataBillName);
                } else if (OrderController.SearchCustomer.model.btnSelect == 'btnSearchDelivery') {
                    //set value
                    var dataBillCst = $(this).data("codecst");
                    var dataBillName = $(this).data("name");

                    $("#CodeDelivery").val(dataBillCst);
                    CommonSettings.events.setValueToDisabledInput('NameDelivery', dataBillName);
                }

                var post = $(this).data("post").toString();
                if (post != '') {
                    CommonSettings.events.setValueToDisabledInput('Post1', post.substr(0, 3));
                    CommonSettings.events.setValueToDisabledInput('Post2', post.substr(3).replace("-", ""));
                    $("#PostDelivery[type='hidden']").val(post);
                }

                CommonSettings.events.setValueToDisabledInput('AddressDelivery', $(this).data("address"));
                $("#searchCustomerDialog").remove();

                // Reload items price
                OrderController.events.onChangeCustomerCst();

                return false;
            }
        }
    }
}