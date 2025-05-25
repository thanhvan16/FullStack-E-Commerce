function formatPrice(price) {
    if (typeof price !== 'number') {
      console.warn('formatPrice: Giá không hợp lệ', price);
      return '0';
    }
    return price.toLocaleString('vi-VN');
  }
  export default formatPrice;