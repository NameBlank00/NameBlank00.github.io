# 1. Kinematics

## Position, velocity, acceleration

A particle's trajectory is a curve $\mathbf{r}(t) \in \mathbb{R}^3$. Its velocity and
acceleration are

$$
\mathbf{v}(t) = \dot{\mathbf{r}}(t), \qquad \mathbf{a}(t) = \ddot{\mathbf{r}}(t).
$$

## Constant acceleration

!!! example "Uniform acceleration"
    If $\mathbf{a}$ is constant, integrating twice gives
    $$
    \mathbf{r}(t) = \mathbf{r}_0 + \mathbf{v}_0 t + \tfrac{1}{2}\mathbf{a}t^2 .
    $$

## Polar coordinates

With $\mathbf{r} = r\,\hat{\mathbf{r}}$ and $\dot{\hat{\mathbf{r}}} = \dot\theta\,\hat{\boldsymbol\theta}$,

$$
\mathbf{a} = \left(\ddot r - r\dot\theta^2\right)\hat{\mathbf{r}}
           + \left(r\ddot\theta + 2\dot r\dot\theta\right)\hat{\boldsymbol\theta}.
$$
