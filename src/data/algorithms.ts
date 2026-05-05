export const algorithmsData = [

  {
    id: 1,
    name: "Steepest Descent (Symbolic Toolbox)",
    code: `format short
clear all
clc

syms x1 x2
f1 = x1-x2+2*x1^2+2*x1*x2+x2^2;
fx = inline(f1);
fobj = @(x) fx(x(:,1),x(:,2));

grada = gradient(f1);
G = inline(grada);
gradax = @(x) G(x(:,1),x(:,2));

H1 = hessian(f1);
Hx = inline(H1);

x0 = [1 1];
maxiter = 4;
tol = 10^(-3);
iter = 0;
X = [];

while norm(gradax(x0)) > tol && iter < maxiter
    X = [X;x0];
    S = -gradax(x0);
    H = Hx(x0);
    lambda = S'*S ./(S'*H*S);
    Xnew = x0 + lambda.*S';
    x0 = Xnew;
    iter = iter+1;
end

fprintf('Optimal Solution X=[%f, %f]\\n',x0(1),x0(2))
fprintf('Optimal Value f(x) = %f \\n',fobj(x0))`
  },

  {
    id: 2,
    name: "Steepest Descent (Numeric, No Toolbox)",
    code: `format short
clear all
clc

% Numeric-only Updated Steepest Descent
fobj = @(x1,x2) x1-x2+2*x1.^2+2*x1.*x2+x2.^2;
grad = @(x) [4*x(1)+2*x(2)+1; 2*x(1)+2*x(2)-1];
H = [4 2; 2 2]; % Hessian matrix

x0 = [1;1];
maxiter = 4;
tol = 1e-3;
X = [];

for iter = 1:maxiter
    g = grad(x0);
    if norm(g) < tol
        break
    end
    lambda = (g'*g) / (g'*H*g);
    x0 = x0 - lambda * g;
    X = [X x0];
end

fprintf('Optimal Solution X=[%f, %f]\\n', x0(1), x0(2))
fprintf('Optimal Value f(x) = %f\\n', fobj(x0(1), x0(2)))`
  }

];
