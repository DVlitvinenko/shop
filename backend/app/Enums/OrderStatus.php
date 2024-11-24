<?php

namespace App\Enums;

enum OrderStatus: string
{
    case PENDING = 'Pending';         // Заказ в ожидании
    case PAID = 'Paid';              // Заказ оплачен
    case SHIPPED = 'Shipped';        // Заказ отправлен
    case DELIVERED = 'Delivered';    // Заказ доставлен
    case CANCELED = 'Canceled';      // Заказ отменен
    case RETURNED = 'Returned';      // Заказ возвращен
    case REFUNDED = 'Refunded';      // Заказ возвращен с возвратом денег
}
