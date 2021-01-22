from app.auth.controllers import add
import pytest


@pytest.mark.parameterize('x, y, result', [
    (10, 10, 20)
])
def test_add(x, y, result):
    assert add(x, y) == result
