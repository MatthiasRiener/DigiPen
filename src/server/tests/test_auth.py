from ..app.auth.controllers import add, sub
import pytest


@pytest.mark.parametrize('x, y, result', [
    (10, 10, 20),
    (10, 45, 55)
])
def test_add(x, y, result):
    assert add(x, y) == result
