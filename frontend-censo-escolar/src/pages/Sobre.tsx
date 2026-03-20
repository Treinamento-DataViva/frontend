import React from 'react'

export default function Sobre() {
    return (
        <div>
            <section className="projeto-atual">
                <h2>O Projeto Censo Escolar</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.
                    Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus
                    rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna
                    non est bibendum non venenatis nisl tempor.
                </p>
                <p>
                    Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere.
                    Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at
                    risus et justo dignissim congue. Donec congue lacinia dui, a porttitor lectus
                    condimentum laoreet.
                </p>
            </section>

            {/* Seção sobre o projeto mãe (DataViva) */}
            <section className="projeto-mae">
                <h2>Sobre o DataViva</h2>
                <p>
                    Aliquam erat volutpat. Phasellus dictum metus vehicula diam ultricies, ut
                    ullamcorper nulla condimentum. Sed eget diam rutrum, consectetur augue sit
                    amet, congue odio. Integer interdum odio eget ipsum feugiat, non posuere
                    purus volutpat.
                </p>
                <p>
                    Cras tincidunt, dolor sit amet imperdiet pretium, orci leo condimentum felis,
                    quis congue mauris justo eu mauris. Sed vulputate blandit urna sit amet
                    varius. Praesent aliquet sed lectus a tristique. Nam eget metus quis justo
                    varius tincidunt.
                </p>
            </section>
        </div>

    )
}
