const {mysql} = require('../../mysql');

module.exports = async (ctx) => {
    console.log('/index...')
    const banner = await mysql('nideshop_ad').where({
        ad_position_id: 1
    }).select();

    const cannel = await mysql('nideshop_channel').select();

    const brand = await mysql('nideshop_brand').where({
        is_new: 1
    }).orderBy('new_sort_order', 'asc').limit(4).select();

    const newGoods = await mysql('nideshop_goods').where({
        is_new: 1
    }).limit(5).select();

    const hotGoods = await mysql('nideshop_goods').where({
        is_hot: 1
    }).limit(5).select();

    ctx.body = {
        banner: banner,
        cannel: cannel,
        brand: brand,
        newGoods: newGoods,
        hotGoods: hotGoods
    }
}