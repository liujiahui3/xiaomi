class Render {
    constructor() {
        this.header = $('#header');
        this.nav = $('#nav');
        this.footer = $('#footer');
        this.phoneLi = $('#section_2 .bottom li')
    }
    init(fn) {
        this.header.load('./header.html',
            () => {
                this.nav.load('./nav.html', fn);
            });
        this.footer.load('./footer.html');
        $.ajax('http://10.31.152.32/xiaomi/php/getdata.php',{
            dataType:'json'
        }).done(
            (data)=>{
                this.phoneLi.each(
                    (index,element)=>{
                        $(element).html(`
                        <a href="http://10.31.152.32/xiaomi/src/details.html">
                            <img src="${data[index].url}"
                                alt="">
                            <h3>${data[index].title}</h3>
                            <p class="title">${data[index].describe}</p>
                            <div class="price">
                                <span class="xianjia">${data[index].cprice}</span>
                                <span class="yuanjia">${data[index].oprice}</span>
                            </div>
                        </a>
                        `)
                    }
                )
            }
        )
    }
}
    



export {
    Render
}

