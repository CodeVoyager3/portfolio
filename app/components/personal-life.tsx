"use client"

import { BlurFade } from "./motion/animated-group"
import TiltedCardContent from "@/components/TiltedCardContent"

export function PersonalLifeSection() {
    return (
        <section className="personal-life-section">
            <BlurFade delay={0}>
                <div className="personal-life-header">
                    <span className="personal-life-label">Beyond Code</span>
                    <h2 className="personal-life-title">Personal Life</h2>
                </div>
            </BlurFade>

            <BlurFade delay={0.1}>
                <TiltedCardContent className="personal-life-tilted-wrapper">
                    <div className="personal-life-card">
                        {/* Decorative Elements */}
                        <div className="quote-decoration quote-decoration-left">"</div>
                        <div className="quote-decoration quote-decoration-right">"</div>

                        {/* Quote Content */}
                        <div className="quote-content">
                            <p className="quote-text">
                                Beyond the screen, I'm a die-hard <span>Real Madrid</span> fan.
                                I carry the <span>Remontada</span> (comeback) spirit into my code—no matter
                                how broken a feature seems or how close the deadline is, I believe in finding a way to
                                <span> win in the final minutes</span>.
                            </p>
                        </div>

                        {/* Footer with Icon */}
                        <div className="quote-footer">
                            <div className="quote-author">
                                <span className="author-icon">⚽</span>
                                <span className="author-name">~ Amritesh</span>
                            </div>
                            <div className="madrid-badge">
                                <span className="badge-text">¡Hala Madrid!</span>
                            </div>
                        </div>

                        {/* Background Accent */}
                        <div className="quote-gradient-bg"></div>
                    </div>
                </TiltedCardContent>
            </BlurFade>
        </section>
    )
}
